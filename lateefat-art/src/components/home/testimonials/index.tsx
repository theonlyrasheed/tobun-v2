import * as React from "react";
import { Box, Text } from "@mantine/core";
import { useTestimonials } from "@/hooks/use-sanity";


export function Testimonials() {
  const { data: testimonials = [] } = useTestimonials();

  if (testimonials.length === 0) return null;

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
        {testimonials.map((tst: any, idx: number) => (
          <Box key={idx} component='figure' className='tst'>
            <Box className='tst-mark'>&ldquo;</Box>
            <Text component='blockquote'>{tst.quote}</Text>
            <Box component='figcaption'>
              {tst.avatarUrl && (
                <Box component='span' className='tst-av'>
                  <Box
                    component='img'
                    src={tst.avatarUrl}
                    alt={tst.name}
                    style={{
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              <Box component='span' className='tst-meta'>
                <Text component='span' className='tn'>
                  {tst.name}
                </Text>
                <Text component='span' className='tr'>
                  {tst.title}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
