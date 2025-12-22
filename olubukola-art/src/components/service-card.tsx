import { Button, Card, Image, Stack, Text, Title } from "@mantine/core";
import { ServiceCardProps } from "@/types";

type ServiceCardComponentProps = ServiceCardProps & {
  onBookService?: (service: ServiceCardProps) => void;
  onMakeEnquiry?: (service: ServiceCardProps) => void;
};

export function ServiceCard({
  id,
  type,
  title,
  description,
  image,
  onBookService,
  onMakeEnquiry,
}: ServiceCardComponentProps) {
  return (
    <Card
      radius='sm'
      padding='lg'
      withBorder
      className='transition-shadow hover:shadow-lg'
    >
      <Card.Section inheritPadding pt='lg'>
        <Image
          src={image}
          h={250}
          w='100%'
          maw={520}
          mx='auto'
          alt={title}
          fit='cover'
          radius='sm'
        />
      </Card.Section>
      <Stack gap='xl' mt='md' h='100%'>
        <Stack gap={6}>
          <Title order={3} className='font-playfair' fz={24} fw={600}>
            {title}
          </Title>
          <Text fz={16} c='gray.6' style={{ lineHeight: 1.3 }} lineClamp={2}>
            {description}
          </Text>
        </Stack>
        <Stack gap='sm' mt='auto'>
          <Button
            fullWidth
            variant='filled'
            color='dark'
            radius='sm'
            size='md'
            h={52}
            onClick={() =>
              onMakeEnquiry?.({
                id,
                type,
                title,
                description,
                image,
              })
            }
          >
            Make Enquiry
          </Button>
          <Button
            fullWidth
            variant='outline'
            color='gray'
            radius='sm'
            size='md'
            h={52}
            styles={{
              root: { color: "var(--mantine-color-dark-9)" },
            }}
            onClick={() =>
              onBookService?.({
                id,
                type,
                title,
                description,
                image,
              })
            }
          >
            Book Service
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
