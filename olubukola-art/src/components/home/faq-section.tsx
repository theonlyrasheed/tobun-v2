import { Accordion, Container, Text } from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";
import { useFaqs } from "@/builders";
import type { AllFaqsQueryResult } from "@/builders/sanity.types";
import type { FAQItemProps } from "@/types";
import clsx from "clsx";

const transformFaqApi = (faq: AllFaqsQueryResult[0]): FAQItemProps => ({
  question: faq.question,
  answer: Array.isArray(faq.answer)
    ? faq.answer
        .filter(
          (block) =>
            block._type === "block" && "children" in block && block.children,
        )
        .map(
          (block) =>
            (block as any).children
              ?.map((child: any) => child.text || "")
              .join("") || "",
        )
        .join("\n")
    : "",
});

export function FAQSection() {
  const { data: faqs, isPlaceholderData } = useFaqs();
  const transformedFaqs: FAQItemProps[] = faqs?.map(transformFaqApi) || [];

  return (
    <Container
      size='full'
      maw={MAX_WIDTH}
      pt={100}
      hidden={!isPlaceholderData && !faqs?.length}
    >
      <SectionTitle
        subtitle='OUR MOST FAQS'
        title='Frequently Asked Questions'
        id={PAGES.FAQS}
      />

      <Accordion mt={50} variant='separated' radius='sm'>
        {transformedFaqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`faq-${index}`}
            className={clsx({ skeleton: isPlaceholderData })}
          >
            <Accordion.Control>
              <Text className='font-playfair' fz={20} fw={600}>
                {faq.question}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text fz={15} c='gray.7'>
                {faq.answer}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
