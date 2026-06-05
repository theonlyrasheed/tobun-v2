import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";

export function FeaturedWork() {
  return (
    <Box component='section' className='section-tight wrap'>
      <Box className='eyebrow-row'>
        <Box>
          <Text component='span' className='kicker'>
            Selected work
          </Text>
          <Text
            component='h2'
            className='h-lg'
            style={{ marginTop: "16px", fontWeight: "500" }}
          >
            The <em className='accent-ochre'>gallery</em>
          </Text>
        </Box>
        <Anchor
          component={Link}
          to='/gallery'
          underline='never'
          className='link-arrow'
        >
          All work
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
        </Anchor>
      </Box>
      <Box className='work-grid' data-reveal>
        <Anchor component={Link} to='/gallery' className='wk wk-tall'>
          <Box
            component='img'
            src='https://picsum.photos/seed/ltcouture/700/1000'
            alt='Digital couture'
          />
          <Box className='cap'>
            <Text component='span' className='t'>
              Form Beyond Fabric
            </Text>
            <Text component='span' className='c'>
              Couture
            </Text>
          </Box>
        </Anchor>
        <Anchor component={Link} to='/gallery' className='wk wk-wide'>
          <Box
            component='img'
            src='https://picsum.photos/seed/ltmural/900/520'
            alt='Mural'
          />
          <Box className='cap'>
            <Text component='span' className='t'>
              Clayton Mural
            </Text>
            <Text component='span' className='c'>
              Mural
            </Text>
          </Box>
        </Anchor>
        <Anchor component={Link} to='/gallery' className='wk'>
          <Box
            component='img'
            src='https://picsum.photos/seed/ltadire/520/520'
            alt='ADIRE textile'
          />
          <Box className='cap'>
            <Text component='span' className='t'>
              Indigo Lines
            </Text>
            <Text component='span' className='c'>
              Textile
            </Text>
          </Box>
        </Anchor>
        <Anchor component={Link} to='/gallery' className='wk'>
          <Box
            component='img'
            src='https://picsum.photos/seed/ltai/520/520'
            alt='AI feature'
          />
          <Box className='cap'>
            <Text component='span' className='t'>
              Synthetic Bloom
            </Text>
            <Text component='span' className='c'>
              AI
            </Text>
          </Box>
        </Anchor>
        <Anchor component={Link} to='/gallery' className='wk wk-wide'>
          <Box
            component='img'
            src='https://picsum.photos/seed/ltpaint/900/520'
            alt='Visual painting'
          />
          <Box className='cap'>
            <Text component='span' className='t'>
              The Art We Carry
            </Text>
            <Text component='span' className='c'>
              Painting
            </Text>
          </Box>
        </Anchor>
      </Box>
    </Box>
  );
}
