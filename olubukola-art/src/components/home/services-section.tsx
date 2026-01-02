import { Box, Container } from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { MAX_WIDTH } from "@/utils/constants";
import { BookingServiceModal } from "@/components/modals/booking-service";
import { MakeEnquiryModal } from "@/components/modals/make-enquiry";
import { useState } from "react";
import { PAGES } from "@/utils/enums";
import { useServices } from "@/builders";
import type { AllServicesQueryResult } from "@/builders/sanity.types";

export function ServicesSection() {
  const [bookingOpened, setBookingOpened] = useState(false);
  const [enquiryOpened, setEnquiryOpened] = useState(false);
  const [selected, setSelected] = useState<AllServicesQueryResult[0] | null>(
    null
  );

  const { data, isPlaceholderData } = useServices();

  return (
    <Container
      size='full'
      maw={MAX_WIDTH}
      pt={{
        base: 30,
        md: 100,
      }}
      pb={{
        base: 30,
      }}
      hidden={!isPlaceholderData && !data?.length}
    >
      <SectionTitle
        subtitle='WHY WE EXIST'
        title='Our Services'
        id={PAGES.SERVICES}
        skeleton={isPlaceholderData}
      />
      <Box
        mt={30}
        className='w-full gap-3 grid'
        style={{
          gridTemplateColumns: "repeat(auto-fill,minmax(min(300px,100%),1fr))",
          gridAutoRows: "1fr",
        }}
      >
        {data?.map((service, idx) => (
          <Box
            key={service._id}
            data-aos='fade-up'
            data-aos-delay={idx * 80}
            hidden={service.image.url === null}
          >
            <ServiceCard
              {...service}
              skeleton={isPlaceholderData}
              onBookService={(svc: AllServicesQueryResult[0]) => {
                setSelected(svc);
                setBookingOpened(true);
              }}
              onMakeEnquiry={(svc: AllServicesQueryResult[0]) => {
                setSelected(svc);
                setEnquiryOpened(true);
              }}
            />
          </Box>
        ))}
      </Box>

      <BookingServiceModal
        opened={bookingOpened}
        onClose={() => setBookingOpened(false)}
        services={data ?? []}
        defaultInterest={selected?.title}
      />

      <MakeEnquiryModal
        opened={enquiryOpened}
        onClose={() => setEnquiryOpened(false)}
        service={selected}
        defaultEventType={selected?.title}
      />
    </Container>
  );
}
