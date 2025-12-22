import { Accordion, Container, Text } from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { faqs } from "@/data/mockData";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";

export function FAQSection() {
  return (
    <Container size='full' maw={MAX_WIDTH} pt={100}>
      <SectionTitle
        subtitle='OUR MOST FAQS'
        title='Frequently Asked Questions'
        id={PAGES.FAQS}
      />

      <Accordion mt={50} variant='separated' radius='sm'>
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`faq-${index}`}>
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
