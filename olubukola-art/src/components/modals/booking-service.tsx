import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Radio,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { sendBookingEmail } from "@/utils/send-booking";
import type {
  ArtworkCardProps as GalleryCardProps,
  ServiceCardProps,
} from "@/types";

export type BookingServiceFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  date: string | null;
  interest: string;
  comments: string;
  agree: boolean;
};

export type BookingServiceModalProps = {
  opened: boolean;
  onClose: () => void;
  services: ServiceCardProps[] | GalleryCardProps[];
  defaultInterest?: ServiceCardProps["title"] | GalleryCardProps["title"] | "";
  modalType?: "service" | "gallery";
  onSubmit?: (values: BookingServiceFormValues) => void;
};

export function BookingServiceModal({
  opened,
  onClose,
  services,
  defaultInterest = "",
  onSubmit,
  modalType = "service",
}: BookingServiceModalProps) {
  const interestOptions = useMemo(
    () =>
      services.map((s) => ({
        value:
          modalType === "service"
            ? (s as ServiceCardProps).title
            : (s as GalleryCardProps).title,
        label: s.title,
      })),
    [services, modalType],
  );

  const form = useForm<BookingServiceFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      date: null,
      interest: defaultInterest,
      comments: "",
      agree: false,
    },
  });

  useEffect(() => {
    if (!opened) return;
    if (defaultInterest) {
      form.setFieldValue("interest", defaultInterest);
    }
  }, [defaultInterest, opened]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = form.onSubmit(async (vals) => {
    setIsSubmitting(true);

    try {
      const result = await sendBookingEmail({ data: vals });

      if (result.success) {
        notifications.show({
          title: "Booking Submitted Successfully!",
          message: "We'll get back to you soon with more details.",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: 5000,
        });

        onSubmit?.(vals);
        onClose();
        form.reset();
      } else {
        throw new Error("Failed to send booking");
      }
    } catch (error) {
      notifications.show({
        title: "Submission Failed",
        message: "Please try again or contact us directly.",
        color: "red",
        icon: <IconX size={18} />,
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <Stack gap={18}>
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

              <DateInput
                label='Date'
                placeholder='dd/mm/yyyy'
                valueFormat='DD/MM/YYYY'
                maxDate={new Date()}
                clearable
                value={form.values.date}
                onChange={(v) => form.setFieldValue("date", v)}
                rightSection={<IconCalendar size={18} />}
                rightSectionPointerEvents='none'
              />

              <Stack gap={10}>
                <Text fw={500} className='font-poppins'>
                  {modalType === "service"
                    ? "Event interest"
                    : "Artwork interest"}
                </Text>

                <Radio.Group
                  value={form.values.interest}
                  onChange={(v) =>
                    form.setFieldValue(
                      "interest",
                      v as BookingServiceFormValues["interest"],
                    )
                  }
                >
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                    {interestOptions.map((opt) => {
                      const active = form.values.interest === opt.value;
                      return (
                        <Paper
                          key={opt.value}
                          component='label'
                          withBorder
                          radius={8}
                          p='md'
                          style={{
                            cursor: "pointer",
                            borderWidth: 0.25,
                            borderColor: active ? "#000" : "rgba(0,0,0,0.25)",
                          }}
                        >
                          <Group wrap='nowrap' gap='sm' align='center'>
                            <Radio value={opt.value} />
                            <Text className='font-poppins' fz={14} c='gray.7'>
                              {opt.label}
                            </Text>
                          </Group>
                        </Paper>
                      );
                    })}
                  </SimpleGrid>
                </Radio.Group>
              </Stack>

              <Textarea
                label='Comments/Special Instruction'
                placeholder='Please type here'
                autosize
                minRows={6}
                {...form.getInputProps("comments")}
              />

              <Group align='flex-start' justify='center' wrap='nowrap'>
                <Checkbox
                  {...form.getInputProps("agree", { type: "checkbox" })}
                  mt={4}
                />
                <Text
                  fz={{
                    base: 12,
                    sm: 13,
                  }}
                  c='gray.7'
                  className='font-poppins'
                >
                  By clicking this box, you are agreeing to Olubukola art terms
                  &amp; conditions to use the given information.
                </Text>
              </Group>

              <Button
                fullWidth
                h={54}
                radius={6}
                disabled={!form.values.agree || isSubmitting}
                loading={isSubmitting}
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
                {isSubmitting ? "Sending..." : "Submit booking"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
