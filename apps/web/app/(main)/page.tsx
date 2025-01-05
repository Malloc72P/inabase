'use client';

import { useHealthCheck } from '@hooks/useHealthCheck';
import { HealthCheckResponse } from '@repo/dto';
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Loader,
  SimpleGrid,
  Text,
} from '@mantine/core';

export default function Home() {
  return (
    <div>
      <Container>
        <SimpleGrid spacing="lg" cols={3}>
          <ListItem title="Breaking Bed" tags={['Drama']} />
          <ListItem title="BattleStar Galactica" tags={['Drama']} />
          <ListItem title="Merlin" tags={['Drama']} />
          <ListItem title="Better call Saul" tags={['Drama']} />
          <ListItem title="Caprica" tags={['Drama']} />
        </SimpleGrid>
      </Container>
    </div>
  );
}

interface ListItemProps {
  title: string;
  tags?: string[];
}

function ListItem({ title, tags = [] }: ListItemProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={320}>
      <Group justify="space-between">
        <Text fw="bold">{title}</Text>
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </Group>
    </Card>
  );
}
