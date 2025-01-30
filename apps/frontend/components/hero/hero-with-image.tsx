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
              보다 더 빠른 <br />
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                서비스 구축
              </Text>{' '}
              을 위한 <br />
              프로젝트 템플릿 <br />
              Inabase를 소개합니다.
            </Title>

            <Text className={classes.description} mt={30}>
              프로젝트 구성은 생각보다 손이 많이 가는 작업입니다. <br />
              eslint, prettier, 프레임워크 설정, styled component 테마 설정, docker-compose,
              환경변수 설정 등... <br />
              해야할 일이 생각보다 많습니다 <br />
              Inabase는 아이디어를 웹서비스로 빠르게 구현할 수 있도록, 웹서비스 프로젝트를
              템플릿으로 제공합니다.
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
