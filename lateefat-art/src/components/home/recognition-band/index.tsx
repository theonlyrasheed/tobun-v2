import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";

export function RecognitionBand() {
  return (
    <Box
      component='section'
      className='section press-band'
      data-screen-label='Home — Recognition'
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
        href='https://guardian.ng/art/lateefat-tobun-leads-art-and-fashion-tech-innovation-at-uk-creative-workshop/#'
        target='_blank'
        rel='noopener noreferrer'
        className='pb-link'
        aria-label='Read on The Guardian'
        data-cursor='view'
        data-cursor-label='Read article'
      />
      <Box className='wrap' style={{ zIndex: 4, pointerEvents: "none" }}>
        <Box className='pb-head' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Text component='span' className='kicker' style={{ pointerEvents: 'auto' }}>
            Recognition
          </Text>
          <Anchor
            component={Link}
            to='/press'
            className='link-arrow'
            style={{
              pointerEvents: "auto",
              position: "relative",
              zIndex: 10,
              textDecoration: "none"
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            View all press
            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              style={{ marginLeft: '4px' }}
            >
              <path d='M3 12L12 3M5 3h7v7' />
            </svg>
          </Anchor>
        </Box>
        <Text component='blockquote' className='pb-quote' data-reveal style={{ pointerEvents: 'auto' }}>
          <span className='mark'>&ldquo;</span>
          Lateefat Tobun leads art and fashion-tech innovation at a UK creative
          workshop &mdash; reimagining tradition for a digital world.
          <span className='mark'>&ldquo;</span>
        </Text>
        <Box component='cite' className='pb-cite' data-reveal style={{ pointerEvents: 'auto' }}>
          The Guardian &middot; October 2025
        </Box>
      </Box>
    </Box>
  );
}

