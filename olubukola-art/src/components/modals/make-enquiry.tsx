import {
  Box,
  Button,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect } from "react";
import type { ServiceCardProps } from "@/types";

export type MakeEnquiryFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  message: string;
};

export type MakeEnquiryModalProps = {
  opened: boolean;
  onClose: () => void;
  defaultEventType?: string;
  service?: ServiceCardProps | null;
  onSubmit?: (values: MakeEnquiryFormValues) => void;
};

export function MakeEnquiryModal({
  opened,
  onClose,
  defaultEventType,
  service,
  onSubmit,
}: MakeEnquiryModalProps) {
  const form = useForm<MakeEnquiryFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      eventType: defaultEventType ?? "",
      date: "",
      location: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!opened) return;
    if (defaultEventType) form.setFieldValue("eventType", defaultEventType);
    if (service?.title) form.setFieldValue("eventType", service.title);
  }, [defaultEventType, opened, service?.title]);

  const handleSubmit = form.onSubmit((vals) => {
    onSubmit?.(vals);
    onClose();
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size={700}
      padding={0}
      radius={0}
      overlayProps={{
        opacity: 0.65,
        blur: 0,
        color: "#000",
      }}
      styles={{
        content: {
          borderRadius: 12,
          overflow: "hidden",
          width: "100%",
          maxWidth: "min(92vw, 700px)",
          border: "3px solid #000",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
        },
        body: {
          padding: 0,
          maxHeight: "calc(100vh - 120px)",
          overflowY: "auto",
        },
      }}
    >
      <Box
        bg='transparent'
        p={{
          base: 0,
          sm: 12,
        }}
      >
        <Paper bg='white' radius={10} p={{ base: 18, sm: 24 }}>
          <Box component='form' onSubmit={handleSubmit}>
            <Stack gap={24}>
              <Text className='font-playball' fz={18} lh={1.1} c='black.8'>
                Olubukola&apos;s
                <br />
                Art Gallery
              </Text>
              <Stack align='center' gap={4}>
                <Title
                  order={3}
                  className='font-playfair text-center'
                  fz={18}
                  fw={700}
                >
                  Tell us your interest, let&apos;s bring your vision to life
                </Title>
                <Text className='font-playfair' fz={18} fw={700} c='gray.6'>
                  Please fill the form
                </Text>
              </Stack>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                <TextInput
                  label='Enter Your First Name'
                  placeholder='Harry'
                  {...form.getInputProps("firstName")}
                />
                <TextInput
                  label='Last Name'
                  placeholder='Potter'
                  {...form.getInputProps("lastName")}
                />
              </SimpleGrid>

              <TextInput
                label='Email Address'
                placeholder='harrypotter@gmail.com'
                {...form.getInputProps("email")}
              />

              <TextInput
                label='Event Type'
                placeholder='Face painting, Illustration etc'
                {...form.getInputProps("eventType")}
              />

              <DateInput
                label='Date'
                placeholder='YYYY/MM/DD'
                valueFormat='YYYY/MM/DD'
                clearable
                value={form.values.date || null}
                onChange={(v) => form.setFieldValue("date", v ?? "")}
                rightSection={<IconCalendar size={18} />}
                rightSectionPointerEvents='none'
              />

              <TextInput
                label='Location'
                placeholder='Allen Ikeja, Lagos, Nigeria'
                {...form.getInputProps("location")}
              />

              <Textarea
                label='Message ( Request )'
                placeholder='Please type here'
                autosize
                minRows={8}
                {...form.getInputProps("message")}
              />

              <Button
                fullWidth
                h={54}
                radius={6}
                type='submit'
                className='font-playfair!'
                styles={{
                  root: {
                    backgroundColor: "#000",
                    border: "2px solid #000",
                    boxShadow: "0 10px 22px rgba(0,0,0,0.22)",
                  },
                }}
              >
                Submit booking
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
