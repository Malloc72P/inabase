import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, MinLength } from 'class-validator';

export class SignUpParam {
  @IsString()
  @IsNotEmpty({
    message: '이메일은 필수 입력 항목입니다.',
  })
  @IsEmail(
    {},
    {
      message: '유효하지 않은 이메일 형식입니다.',
    }
  )
  @MaxLength(100, {
    message: '이메일은 최대 100자 이하여야 합니다.',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: '이름은 필수 입력 항목입니다.',
  })
  @MinLength(2, {
    message: '이름은 최소 2자 이상이어야 합니다.',
  })
  @MaxLength(50, {
    message: '이름은 최대 50자 이하여야 합니다.',
  })
  name: string;

  @IsString()
  @IsNotEmpty({
    message: '비밀번호는 필수 입력 항목입니다.',
  })
  @MinLength(8, {
    message: '비밀번호는 최소 8자 이상이어야 합니다.',
  })
  @MaxLength(100, {
    message: '비밀번호는 최대 100자 이하여야 합니다.',
  })
  password: string;
}

export class SignUpResult {
  @Expose()
  result: boolean;
}
