import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";

export function RecognitionBand() {
  return (
    <Box
      component='section'
      className='section press-band'
      data-screen-label='Home — Recognition'
      data-cursor='view'
      data-cursor-label='View press'
      style={{ position: "relative" }}
    >
      <Box className='pb-bg'>
        <Box
          component='img'
          src='/assets/img/creative-workshop-guardian.jpg'
          alt='Creative Workshop'
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box className='pb-scrim' />
      <Anchor
        component={Link}
        to='/press'
        className='pb-link'
        aria-label='View all press'
      />
      <Box className='wrap'>
        <Box className='pb-head'>
          <Text component='span' className='kicker'>
            Recognition
          </Text>
          <Box component='span' className='link-arrow'>
            View all press
            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
            >
              <path d='M3 12L12 3M5 3h7v7' />
            </svg>
          </Box>
        </Box>
        <Text component='blockquote' className='pb-quote' data-reveal>
          <span className='mark'>&ldquo;</span>
          Lateefat Tobun leads art and fashion-tech innovation at a UK creative
          workshop &mdash; reimagining tradition for a digital world.
          <span className='mark'>&ldquo;</span>
        </Text>
        <Box component='cite' className='pb-cite' data-reveal>
          The Guardian &middot; October 2025
        </Box>
      </Box>
    </Box>
  );
}
