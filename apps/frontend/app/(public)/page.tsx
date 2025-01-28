import { HeroWithImage } from '@components/hero';
import { FeaturesGrid } from '@components/hero/features';
import { PageLinkMap } from '@libs/link-map';
import { Box } from '@mantine/core';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <HeroWithImage />

      <FeaturesGrid />
    </>
  );
}
