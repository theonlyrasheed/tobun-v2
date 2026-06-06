import * as React from "react";
import { Box, Text } from "@mantine/core";
import { useServices } from "@/hooks/use-sanity";


export function Services() {
  const { data: services = [] } = useServices();

  if (services.length === 0) return null;

  return (
    <Box component='section' className='section cream-2-block'>
      <Box className='wrap'>
        <Box className='eyebrow-row'>
          <Box>
            <Text component='span' className='kicker'>
              What I do
            </Text>
            <Text
              component='h2'
              className='h-lg'
              style={{ marginTop: "16px", fontWeight: "500" }}
            >
              Services &amp; collaboration
            </Text>
          </Box>
          <Text component='p' className='lead' style={{ maxWidth: "34ch" }}>
            Fusing art and digital innovation into immersive experiences — and
            empowering creators through hands-on workshops.
          </Text>
        </Box>
        <Box className='svc'>
          {services.map((svc: any, idx: number) => {
            const displayNum = String(idx + 1).padStart(2, "0");
            return (
              <Box key={idx} className='row' data-reveal>
                <Text component='span' className='num'>
                  {displayNum}
                </Text>
                <Text component='span' className='nm'>
                  {svc.title}
                </Text>
                <Text component='span' className='ds'>
                  {svc.description}
                </Text>
                {svc.tags && svc.tags.length > 0 && (
                  <Box component='span' className='chips'>
                    {svc.tags.map((tag: string, tagIdx: number) => (
                      <Box key={tagIdx} component='span' className='tag'>
                        {tag}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
