'use client';

import { Tabs } from '@mantine/core';
import classes from './main-navbar.module.css';

export const MAIN_NAVBAR_HEIGHT = 40;

export interface INavbarItem {
  label: string;
  value: string;
  onClick?: () => void;
}

export interface MainNavbarProps {
  items: INavbarItem[];
  selected?: string;
}

export function MainNavbar({ items, selected }: MainNavbarProps) {
  return (
    <header className="main-navbar">
      <Tabs
        value={selected}
        variant="outline"
        classNames={{
          root: classes.navbar,
          list: classes.tabsList,
          tab: classes.tab,
        }}
        px="md"
      >
        <Tabs.List>
          {items.map((item) => (
            <Tabs.Tab key={item.value} value={item.value} onClick={item.onClick}>
              {item.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </header>
  );
}
