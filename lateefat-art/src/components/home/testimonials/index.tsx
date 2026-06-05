import { Box, Text } from "@mantine/core";

export function Testimonials() {
  return (
    <Box component='section' className='section-tight wrap'>
      <Box className='eyebrow-row'>
        <Box>
          <Text component='span' className='kicker'>
            Kind words
          </Text>
          <Text
            component='h2'
            className='h-lg'
            style={{ marginTop: "16px", fontWeight: "500" }}
          >
            What people <em className='accent-ochre'>say</em>
          </Text>
        </Box>
        <Text component='p' className='lead' style={{ maxWidth: "30ch" }}>
          From workshop rooms to gallery walls — voices from the people I've
          created with.
        </Text>
      </Box>
      <Box className='tst-grid' data-reveal>
        <Box component='figure' className='tst'>
          <Box className='tst-mark'>&ldquo;</Box>
          <Text component='blockquote'>
            Lateefat turned a room of strangers into makers in an afternoon.
            People left holding something they made — and a little more of
            themselves.
          </Text>
          <Box component='figcaption'>
            <Box component='span' className='tst-av'>
              <Box
                component='img'
                src='/assets/img/avatar-tst-av-1.png'
                alt='Amara Okafor'
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box component='span' className='tst-meta'>
              <Text component='span' className='tn'>
                Amara Okafor
              </Text>
              <Text component='span' className='tr'>
                Workshop participant · Bradford
              </Text>
            </Box>
          </Box>
        </Box>
        <Box component='figure' className='tst'>
          <Box className='tst-mark'>&ldquo;</Box>
          <Text component='blockquote'>
            Her work sits exactly where tradition meets technology. The ADIRE
            indigo feels ancestral and the digital layer feels like tomorrow.
          </Text>
          <Box component='figcaption'>
            <Box component='span' className='tst-av'>
              <Box
                component='img'
                src='/assets/img/avatar-tst-av-2.png'
                alt='Daniel Mensah'
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box component='span' className='tst-meta'>
              <Text component='span' className='tn'>
                Daniel Mensah
              </Text>
              <Text component='span' className='tr'>
                Curator · Accra
              </Text>
            </Box>
          </Box>
        </Box>
        <Box component='figure' className='tst'>
          <Box className='tst-mark'>&ldquo;</Box>
          <Text component='blockquote'>
            Collaborating with Lateefat is rare — rigorous about the craft,
            generous with the vision. She makes the ambitious feel inevitable.
          </Text>
          <Box component='figcaption'>
            <Box component='span' className='tst-av'>
              <Box
                component='img'
                src='/assets/img/avatar-tst-av-3.png'
                alt='Sofia Reyes'
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box component='span' className='tst-meta'>
              <Text component='span' className='tn'>
                Sofia Reyes
              </Text>
              <Text component='span' className='tr'>
                Creative director · London
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
