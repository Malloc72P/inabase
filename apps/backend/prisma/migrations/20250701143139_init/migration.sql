-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Show" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "searchVector" tsvector,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "label" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowTag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "showId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ShowTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "User"("email");

-- CreateIndex
CREATE INDEX "show_fts_idx" ON "Show" USING GIN ("searchVector");

-- 검색 성능을 위한 인덱스 추가
-- string_agg를 위한 JOIN이 커버링 인덱스로 끝날 수 있도록 개선
CREATE INDEX showtag_showid_tagid_idx ON "ShowTag"("showId","tagId") WHERE deleted = false;


-- AddForeignKey
ALTER TABLE "ShowTag" ADD CONSTRAINT "ShowTag_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowTag" ADD CONSTRAINT "ShowTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ==============================================================================
-- Vector 검색을 위한 Function
-- ==============================================================================

-- 매개변수로 받은 showId에 해당하는 Show의 제목, 설명, 태그를 기반으로
-- tsvector를 생성하여 "searchVector" 컬럼에 저장하는 함수
CREATE OR REPLACE FUNCTION build_show_search_vector(p_show_id text)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
    v_title  text;
    v_desc   text;
    v_tags   text;
    v_vec    tsvector;
-- 함수를 호출한 쪽과 같은 트랜잭션에서 실행된다.
BEGIN
    -- Show의 제목, 설명, 태그를 가져와서 변수에 저장
    SELECT title, description INTO v_title, v_desc
    FROM "Show" WHERE id = p_show_id AND deleted = false;

    -- Show의 모든 태그를 가져와서 하나의 문자열로 합치기
    SELECT string_agg(T.label, ' ')
      INTO v_tags
      FROM "ShowTag" ST
      JOIN "Tag"     T ON T.id = ST."tagId"
     WHERE ST."showId" = p_show_id
       AND ST.deleted  = false
       AND T.deleted   = false;

    -- 각 필드의 내용을 tsvector로 변환하고 가중치를 부여하여 결합
    v_vec :=
        setweight(to_tsvector('simple', coalesce(v_title,'')),       'A') ||
        setweight(to_tsvector('simple', coalesce(v_desc ,'')),       'B') ||
        setweight(to_tsvector('simple', coalesce(v_tags ,'')),       'A');  -- 태그에 높은 가중치

    -- "searchVector" 컬럼에 tsvector 저장
    UPDATE "Show"
       SET "searchVector" = v_vec
     WHERE id = p_show_id;
END;
$$;

-- 태그 연결/해제를 위한 Function
-- showTag가 insert, delete되면 showId에 해당하는 Show의 "searchVector"를 갱신
-- 각 상황에서 showId를 가지고 있을 객체가 New, Old로 달라지므로 분기함.
-- 참고로 insert에서 new는 새로 추가된 행을, delete에서 old는 삭제된 행을 의미하는 가상 레코드이다.
CREATE OR REPLACE FUNCTION trg_showtag_idu()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM build_show_search_vector(NEW."showId");
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM build_show_search_vector(OLD."showId");
    ELSE  -- UPDATE
        IF NEW."showId" IS DISTINCT FROM OLD."showId" THEN
            PERFORM build_show_search_vector(OLD."showId");
            PERFORM build_show_search_vector(NEW."showId");
        ELSE
            PERFORM build_show_search_vector(NEW."showId");
        END IF;
    END IF;
    RETURN NULL;
END;
$$;

-- Tag 레이블을 수정할 때마다 Show의 "searchVector"를 갱신하는 함수
CREATE OR REPLACE FUNCTION trg_tag_label_u()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF OLD.label IS DISTINCT FROM NEW.label THEN
        -- 이름이 바뀐 태그가 달려 있는 모든 Show의 searchVector 재계산
        PERFORM build_show_search_vector(st."showId")
        FROM "ShowTag" st
        WHERE st."tagId" = NEW.id
          AND st.deleted = false;
    END IF;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION trg_show_fts_refresh()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  -- title이나 description이 실제로 변경된 경우만 실행
  IF TG_OP = 'INSERT' OR 
     OLD.title IS DISTINCT FROM NEW.title OR 
     OLD.description IS DISTINCT FROM NEW.description THEN
    PERFORM build_show_search_vector(NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

-- ==============================================================================
-- Vector 검색을 위한 Trigger 설정
-- trg = trigger
-- i = insert
-- u = update
-- d = delete
-- ==============================================================================

-- show 테이블에 데이터가 삽입되면 search_vector를 갱신한다
CREATE CONSTRAINT TRIGGER show_fts_refresh_insert
AFTER INSERT ON "Show"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION trg_show_fts_refresh();

-- show 테이블의 title, description, deleted가 수정되면 search_vector를 갱신한다
-- 삭제된 경우에도 갱신하는 이유는, 다시 복구되었을 때 searchVector의 정합성을 보장하기 위해서이다.
CREATE CONSTRAINT TRIGGER show_fts_refresh_update
AFTER UPDATE OF title, description, deleted ON "Show"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION trg_show_fts_refresh();

-- 참고로 Show에 대한 하드딜리트는 searchVector를 담은 레코드 자체가 제거되니까 걱정하지 않아도 된다.

-- 중간테이블 showTag의 insert, update, delete에 대해 trg_showtag_idu 함수를 호출하여 
-- Show의 "searchVector"를 갱신하는 트리거
CREATE TRIGGER showtag_fts_refresh_idu
AFTER INSERT OR UPDATE OR DELETE ON "ShowTag"
FOR EACH ROW EXECUTE FUNCTION trg_showtag_idu();

-- Tag 레이블이 수정될 때마다 trg_tag_label_u 함수를 호출하여
-- Show의 "searchVector"를 갱신하는 트리거
CREATE TRIGGER tag_label_refresh_u
AFTER UPDATE OF label ON "Tag"
FOR EACH ROW EXECUTE FUNCTION trg_tag_label_u();

-- 태그도 마찬가지로 하드딜리트되면 showTag부터 삭제되니까 걱정할 필요 없다.
-- soft delete도 마찬가지로, 태그가 제거되면 중간 테이블인 showTag도 soft delete할테니, 벡터 갱신이 중복해서 발생한다.
-- 그래서 tag가 soft delete 되더라도 벡터를 재계산하지 않는다.
