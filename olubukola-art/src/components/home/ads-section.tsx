import { Box, Image } from "@mantine/core";

const ads = [
  { src: "/svgs/ads/mobile-app.svg", alt: "Mobile App" },
  { src: "/svgs/ads/exhibition.svg", alt: "Exhibition" },
  { src: "/svgs/ads/gift-box.svg", alt: "Gift Box" },
] as const;

export function AdsSection() {
  return (
    <Box className='ads-fade' style={{ backgroundColor: "white" }}>
      <Box
        className='ads-fade-viewport'
        aria-label='Ads'
        mih={{
          base: 100,
          md: 530,
        }}
      >
        {ads.map((ad, idx) => (
          <Box
            key={ad.src}
            className='ads-fade-item'
            style={{ animationDelay: `${idx * 2.8}s` }}
          >
            <Image src={ad.src} alt={ad.alt} fit='cover' />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
