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
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import type { ServiceCardProps } from "@/types";

export type BookingServiceFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  interest: ServiceCardProps["title"] | "";
  comments: string;
  agree: boolean;
};

export type BookingServiceModalProps = {
  opened: boolean;
  onClose: () => void;
  services: ServiceCardProps[];
  defaultInterest?: ServiceCardProps["title"] | "";
  onSubmit?: (values: BookingServiceFormValues) => void;
};

export function BookingServiceModal({
  opened,
  onClose,
  services,
  defaultInterest = "",
  onSubmit,
}: BookingServiceModalProps) {
  const isSmDown = useMediaQuery("(max-width: 48em)"); // <= 768px

  const interestOptions = useMemo(
    () =>
      services.map((s) => ({
        value: s.title,
        label: s.title,
      })),
    [services]
  );

  const [values, setValues] = useState<BookingServiceFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    interest: defaultInterest,
    comments: "",
    agree: false,
  });

  useEffect(() => {
    if (!opened) return;
    setValues((prev) => ({
      ...prev,
      interest: defaultInterest || prev.interest,
    }));
  }, [defaultInterest, opened]);

  const update = <K extends keyof BookingServiceFormValues>(
    key: K,
    value: BookingServiceFormValues[K]
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    onSubmit?.(values);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      fullScreen={!!isSmDown}
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
          border: "3px solid #000",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
        },
        body: { padding: 0 },
      }}
    >
      <Box p={{ base: 16, sm: 20 }} bg='transparent'>
        <Text fz={16} c='dimmed' mb={10} className='font-poppins'>
          Booking Service
        </Text>

        <Paper
          bg='white'
          radius={10}
          p={{ base: 18, sm: 24 }}
          style={{
            border: "2px solid #000",
          }}
        >
          <Stack gap={18}>
            <Stack gap={4} align='center'>
              <Text className='font-playball' fz={34} lh={1.1} c='black'>
                Olubukola&apos;s
                <br />
                Art Gallery
              </Text>
              <Title order={3} className='font-playfair' fz={18} fw={700}>
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
                value={values.firstName}
                onChange={(e) => update("firstName", e.currentTarget.value)}
              />
              <TextInput
                label='Last Name'
                placeholder='Potter'
                value={values.lastName}
                onChange={(e) => update("lastName", e.currentTarget.value)}
              />
            </SimpleGrid>

            <TextInput
              label='Email Address'
              placeholder='harrypotter@gmail.com'
              value={values.email}
              onChange={(e) => update("email", e.currentTarget.value)}
            />

            <TextInput
              label='Date'
              type='date'
              value={values.date}
              onChange={(e) => update("date", e.currentTarget.value)}
            />

            <Stack gap={10}>
              <Text fw={700} className='font-poppins'>
                Event interest
              </Text>

              <Radio.Group
                value={values.interest}
                onChange={(v) =>
                  update("interest", v as BookingServiceFormValues["interest"])
                }
              >
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                  {interestOptions.map((opt) => {
                    const active = values.interest === opt.value;
                    return (
                      <Paper
                        key={opt.value}
                        component='label'
                        withBorder
                        radius={8}
                        p='md'
                        style={{
                          cursor: "pointer",
                          borderColor: active ? "#000" : "rgba(0,0,0,0.25)",
                          boxShadow: active
                            ? "0 0 0 1px #000 inset"
                            : undefined,
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
              minRows={5}
              value={values.comments}
              onChange={(e) => update("comments", e.currentTarget.value)}
            />

            <Group align='flex-start' wrap='nowrap'>
              <Checkbox
                checked={values.agree}
                onChange={(e) => update("agree", e.currentTarget.checked)}
                mt={4}
              />
              <Text fz={13} c='gray.7' className='font-poppins'>
                By clicking this box, you are agreeing to Olubukola art terms
                &amp; conditions to use the given information.
              </Text>
            </Group>

            <Button
              fullWidth
              h={54}
              radius={6}
              disabled={!values.agree}
              onClick={handleSubmit}
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
        </Paper>
      </Box>
    </Modal>
  );
}
