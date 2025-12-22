import { Box, Container } from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/data/mockData";
import { MAX_WIDTH } from "@/utils/constants";
import { BookingServiceModal } from "@/components/modals/booking-service";
import { MakeEnquiryModal } from "@/components/modals/make-enquiry";
import { useState } from "react";
import type { ServiceCardProps } from "@/types";
import { PAGES } from "@/utils/enums";

export function ServicesSection() {
  const [bookingOpened, setBookingOpened] = useState(false);
  const [enquiryOpened, setEnquiryOpened] = useState(false);
  const [selected, setSelected] = useState<ServiceCardProps | null>(null);

  return (
    <Container
      size="full"
      maw={MAX_WIDTH}
      pt={{
        base: 30,
        md: 100,
      }}
      pb={{
        base: 30,
      }}
    >
      <SectionTitle
        subtitle="WHY WE EXIST"
        title="Our Services"
        id={PAGES.SERVICES}
      />
      <Box
        mt={30}
        className="w-full gap-3 grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill,minmax(min(300px,100%),1fr))",
          gridAutoRows: "1fr",
        }}
      >
        {services.map((service, idx) => (
          <Box key={service.id} data-aos="fade-up" data-aos-delay={idx * 80}>
            <ServiceCard
              {...service}
              onBookService={(svc) => {
                setSelected(svc);
                setBookingOpened(true);
              }}
              onMakeEnquiry={(svc) => {
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
        services={services}
        defaultInterest={selected?.type ?? ""}
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
