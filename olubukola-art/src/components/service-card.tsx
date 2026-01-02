import { Button, Card, Image, Stack, Text, Title } from "@mantine/core";
import { ServiceCardProps } from "@/types";
import clsx from "clsx";
import type { AllServicesQueryResult } from "@/builders/sanity.types";

type ServiceCardComponentProps = ServiceCardProps & {
  skeleton?: boolean;
  onBookService?: (service: AllServicesQueryResult[0]) => void;
  onMakeEnquiry?: (service: AllServicesQueryResult[0]) => void;
};

export function ServiceCard(props: ServiceCardComponentProps) {
  const { title, description, image, onBookService, onMakeEnquiry, skeleton } =
    props;

  return (
    <Card
      radius='sm'
      padding='lg'
      withBorder
      className='transition-shadow hover:shadow-lg'
      hidden={!image.url}
    >
      <Card.Section inheritPadding pt='lg' className={clsx({ skeleton })}>
        <Image
          src={image.url}
          h={250}
          w='100%'
          maw={520}
          mx='auto'
          alt={image.alt}
          fit='cover'
          radius='sm'
        />
      </Card.Section>
      <Stack gap='xl' mt='md' h='100%'>
        <Stack gap={6}>
          <Title
            order={3}
            className={clsx("font-playfair", { skeleton })}
            fz={24}
            fw={600}
          >
            {title}
          </Title>
          <Text
            fz={16}
            c='gray.6'
            style={{ lineHeight: 1.3 }}
            lineClamp={2}
            className={clsx({ skeleton })}
          >
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
            onClick={() => onMakeEnquiry?.(props)}
            className={clsx({ skeleton })}
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
            onClick={() => onBookService?.(props)}
            className={clsx({ skeleton })}
          >
            Book Service
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
