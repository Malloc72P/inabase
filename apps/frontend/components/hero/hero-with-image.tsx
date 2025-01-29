'use client';

import { Button, Container, Text, Title } from '@mantine/core';
import classes from './hero-with-image.module.css';
import { useNavigator } from '@hooks/use-navigator';

export function HeroWithImage() {
  const navigator = useNavigator();
  const onGetStartedClick = () => {
    navigator.moveTo.protected.main();
  };

  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              안녕하세요! <br />
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                Full Stack
              </Text>{' '}
              개발자 <br />
              Malloc72P입니다.
            </Title>

            <Text className={classes.description} mt={30}>
              Typescript를 주력 언어로 사용하는 FullStack 개발자 Malloc72P라고 합니다. <br />
              본 포트폴리오는 NextJS와 NestJS로 개발했습니다. <br />
              Decorator와 강력한 모듈 기능으로 직관적이고 확장에 열려있지만, <br />
              변경에는 닫혀있는 강력한 백엔드 프레임워크인 NestJS와 <br />
              Server Component와 Server Action으로 생산성 및 보안이라는 두마리 토끼를 <br />
              잡은 Full Stack 포트폴리오입니다.
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
              onClick={onGetStartedClick}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
