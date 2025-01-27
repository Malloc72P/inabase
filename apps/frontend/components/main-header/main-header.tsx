'use client';

import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import classes from './main-header.module.css';
import { cn } from '@libs/ui';

export interface HeaderLinkModel {
  link: string;
  label: string;
}

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
] as const;

export function MainHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState<string>(links[0].link);

  return (
    <header className={cn('main-header', classes.header)}>
      <Container size="md" className={classes.inner}>
        <div className={classes.logo}>💎 InaBase</div>
        <Group gap={5} visibleFrom="xs">
          {links.map((link) => (
            <HeaderLink key={link.label} link={link} active={active} setActive={setActive} />
          ))}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}

interface HeaderLinkProps {
  link: HeaderLinkModel;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

function HeaderLink({ link, active, setActive }: HeaderLinkProps) {
  return (
    <a
      href={link.link}
      className={cn('header-link', classes.link)}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  );
}
