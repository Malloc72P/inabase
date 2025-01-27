import { PageLinkMap } from '@libs/link-map';
import { Box } from '@mantine/core';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      landing
      <Box>
        <Link href={PageLinkMap.protected.main()}>main</Link>
      </Box>
    </>
  );
}
