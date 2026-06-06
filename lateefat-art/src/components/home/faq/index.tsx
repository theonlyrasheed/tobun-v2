import * as React from "react";
import { Box, Text } from "@mantine/core";

import { useFAQs } from "@/hooks/use-sanity";
import { PortableText } from "@portabletext/react";


export function FAQ() {
  const { data: faqs = [] } = useFAQs();

  if (faqs.length === 0) return null;

  return (
    <Box component="section" className="section cream-2-block">
      <Box className="wrap faq-wrap">
        <Box className="faq-head">
          <Text component="span" className="kicker">Good to know</Text>
          <Text component="h2" className="h-lg" style={{ marginTop: "16px" }}>
            Frequently <em className="accent-ochre">asked</em>
          </Text>
          <Text component="p" className="lead">
            Commissions, workshops and collaborations — the things people ask before
            we begin.
          </Text>
        </Box>
        <Box className="faq-list" data-reveal>
          {faqs.map((faq: any, idx: number) => (
            <Box key={idx} component="details" className="faq" open={idx === 0 ? true : undefined}>
              <Box component="summary">
                {faq.question}
                <Box component="span" className="ic" />
              </Box>
              <Box className="faq-a">
                {Array.isArray(faq.answer) ? (
                  <PortableText value={faq.answer} />
                ) : (
                  faq.answer
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
