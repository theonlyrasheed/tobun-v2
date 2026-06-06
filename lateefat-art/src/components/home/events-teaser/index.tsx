import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";
import { useEvents, useExhibitions } from "@/hooks/use-sanity";

export function EventsTeaser() {
  const { data: events = [] } = useEvents();
  const { data: exhibitions = [] } = useExhibitions();

  const items = React.useMemo(() => {
    const combined: Array<{
      img: string;
      tag: string;
      title: string;
      desc: string;
      to: string;
      params?: any;
      dateVal: number;
    }> = [];

    // Map events
    events.forEach((ev) => {
      combined.push({
        img: ev.img,
        tag: `${ev.yr} · ${ev.location || "Event"}`,
        title: ev.title,
        desc: ev.desc,
        to: ev.slug ? "/events/$slug" : "/events",
        params: ev.slug ? { slug: ev.slug } : undefined,
        dateVal: ev.rawDate ? new Date(ev.rawDate).getTime() : 0,
      });
    });

    // Map exhibitions
    exhibitions.forEach((exh) => {
      const yearNum = parseInt(exh.year) || 2025;
      combined.push({
        img: exh.record.img,
        tag: `${exh.year} · ${exh.place || "Exhibition"}`,
        title: exh.name,
        desc: exh.desc,
        to: "/exhibitions",
        dateVal: new Date(`${yearNum}-07-01`).getTime(),
      });
    });

    // Sort by dateVal descending (most recent first)
    combined.sort((a, b) => b.dateVal - a.dateVal);

    return combined.slice(0, 3);
  }, [events, exhibitions]);

  return (
    <Box component='section' className='section wrap'>
      <Box className='eyebrow-row'>
        <Box>
          <Text component='span' className='kicker'>
            On now &amp; next
          </Text>
          <Text
            component='h2'
            className='h-lg'
            style={{ marginTop: "16px", fontWeight: "500" }}
          >
            Events &amp; <em className='accent-ochre'>exhibitions</em>
          </Text>
        </Box>
        <Anchor
          component={Link}
          to='/events'
          underline='never'
          className='link-arrow'
        >
          All events
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
      <Box className='mini-row'>
        {items.map((item, i) => (
          <Anchor
            key={i}
            component={Link}
            to={item.to as any}
            params={item.params}
            underline='never'
            className='mini'
            data-reveal
          >
            <Box className='mimg' data-cursor='view'>
              <Box
                component='img'
                src={item.img}
                alt={item.title}
              />
            </Box>
            <Box>
              <Box
                component='span'
                className='tag'
                style={{ marginBottom: "10px" }}
              >
                {item.tag}
              </Box>
              <Box className='mt'>{item.title}</Box>
              <Text component='p' className='md ev-teaser-desc'>
                {item.desc}
              </Text>
            </Box>
          </Anchor>
        ))}
      </Box>
      <style>{`
        .ev-teaser-desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </Box>
  );
}
