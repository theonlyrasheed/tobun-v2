import { Carousel } from "@mantine/carousel";
import {
  Accordion,
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Checkbox,
  Drawer,
  Flex,
  InputWrapper,
  type MantineThemeComponents,
  Menu,
  MultiSelect,
  NavLink,
  NumberInput,
  PasswordInput,
  PinInput,
  Progress,
  RadioCard,
  Rating,
  Select,
  Stack,
  Stepper,
  Tabs,
  TextInput,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { DateInput, DateTimePicker, TimeInput } from "@mantine/dates";

import accordion from "./accordion.module.css";
import actionIcon from "./action-icon.module.css";
import anchor from "./anchor.module.css";
import appShell from "./app-shell.module.css";
import button from "./button.module.css";
import carousel from "./carousel.module.css";
import dateInput from "./date-input.module.css";
import datePickerInput from "./date-picker-input.module.css";
import dateTimePicker from "./date-time-picker.module.css";
import drawer from "./drawer.module.css";
import flex from "./flex.module.css";
import inputWrapper from "./input-wrapper.module.css";
import menu from "./menu.module.css";
import multiSelect from "./multi-select.module.css";
import navlink from "./navlink.module.css";
import numberInput from "./number-input.module.css";
import passwordInput from "./password-input.module.css";
import progress from "./progress.module.css";
import radioCard from "./radio-card.module.css";
import select from "./select.module.css";
import stack from "./stack.module.css";
import stepper from "./stepper.module.css";
import tabs from "./tabs.module.css";
import textInput from "./text-input.module.css";
import textarea from "./textarea.module.css";
import timeInput from "./time-input.module.css";

export const components: MantineThemeComponents = {
  InputWrapper: InputWrapper.extend({
    classNames: inputWrapper,
  }),
  DateTimePicker: DateTimePicker.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: dateTimePicker,
  }),
  Drawer: Drawer.extend({
    defaultProps: {
      keepMounted: true,
      lockScroll: true,
      position: "right",
      size: 500,
    },
    classNames: drawer,
  }),
  Carousel: Carousel.extend({
    classNames: carousel,
  }),
  NumberInput: NumberInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: numberInput,
  }),
  TextInput: TextInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: textInput,
  }),
  DateInput: DateInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: dateInput,
  }),
  TimeInput: TimeInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: timeInput,
  }),
  DatePickerInput: DateTimePicker.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: datePickerInput,
  }),
  Textarea: Textarea.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
      resize: "vertical",
      autosize: true,
      minRows: 3,
      maxRows: 9,
    },
    classNames: textarea,
  }),
  PasswordInput: PasswordInput.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
    },
    classNames: passwordInput,
  }),
  Select: Select.extend({
    defaultProps: {
      size: "lg",
      searchable: true,
      variant: "default",
      clearable: true,
      checkIconPosition: "right",
    },
    classNames: select,
  }),
  MultiSelect: MultiSelect.extend({
    defaultProps: {
      size: "lg",
      variant: "default",
      checkIconPosition: "right",
    },
    classNames: multiSelect,
  }),
  NavLink: NavLink.extend({
    classNames: navlink,
  }),
  ActionIcon: ActionIcon.extend({
    classNames: actionIcon,
  }),
  Anchor: Anchor.extend({
    classNames: anchor,
  }),
  AppShell: AppShell.extend({
    classNames: appShell,
  }),
  Button: Button.extend({
    defaultProps: {
      size: "lg",
      fw: 500,
    },
    classNames: button,
  }),
  Checkbox: Checkbox.extend({
    defaultProps: {
      radius: "sm",
      styles: {
        input: {
          cursor: "pointer",
        },
      },
    },
  }),
  PinInput: PinInput.extend({
    defaultProps: {
      length: 6,
      inputMode: "numeric",
      mask: true,
      placeholder: "0",
    },
  }),
  Stack: Stack.extend({
    defaultProps: {
      align: "stretch",
    },
    classNames: stack,
  }),
  Tabs: Tabs.extend({
    defaultProps: {
      classNames: tabs,
    },
  }),
  Flex: Flex.extend({
    defaultProps: {
      classNames: flex,
    },
  }),
  Stepper: Stepper.extend({
    defaultProps: {
      classNames: stepper,
    },
  }),
  Rating: Rating.extend({
    defaultProps: {
      color: "orange.8",
      emptySymbol() {
        return <RatingEmptyIcon />;
      },
      fullSymbol() {
        return <RatingFillIcon />;
      },
    },
  }),
  Menu: Menu.extend({
    defaultProps: {
      position: "bottom-start",
      classNames: menu,
    },
  }),
  Accordion: Accordion.extend({
    defaultProps: {
      classNames: accordion,
    },
  }),
  UnstyledButton: UnstyledButton.extend({
    defaultProps: {
      classNames: {
        root: "mantine-active",
      },
    },
  }),
  Progress: Progress.extend({
    classNames: progress,
  }),
  RadioCard: RadioCard.extend({
    classNames: radioCard,
  }),
};

function RatingFillIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fontSize: "var(--rating-size)",
      }}
    >
      <path
        d="M8.17649 12.7037L11.2944 14.6791C11.6929 14.9316 12.1877 14.5561 12.0695 14.0908L11.1686 10.5472C11.1433 10.4485 11.1463 10.3447 11.1773 10.2476C11.2083 10.1505 11.2661 10.0642 11.344 9.99853L14.14 7.67144C14.5073 7.36567 14.3177 6.75598 13.8457 6.72534L10.1944 6.48838C10.0961 6.48135 10.0018 6.44653 9.92245 6.38797C9.84313 6.32941 9.78207 6.24952 9.74639 6.15761L8.38462 2.72832C8.3476 2.63076 8.28178 2.54676 8.1959 2.4875C8.11002 2.42823 8.00814 2.39648 7.9038 2.39648C7.79945 2.39648 7.69757 2.42823 7.61169 2.4875C7.52581 2.54676 7.46 2.63076 7.42298 2.72832L6.06121 6.15761C6.02553 6.24952 5.96447 6.32941 5.88515 6.38797C5.80582 6.44653 5.71149 6.48135 5.61315 6.48838L1.96187 6.72534C1.48988 6.75598 1.30026 7.36567 1.66763 7.67144L4.46354 9.99853C4.54146 10.0642 4.59926 10.1505 4.63029 10.2476C4.66132 10.3447 4.66433 10.4485 4.63896 10.5472L3.80355 13.8335C3.66163 14.3918 4.25541 14.8424 4.73367 14.5394L7.63111 12.7037C7.7126 12.6519 7.8072 12.6243 7.9038 12.6243C8.0004 12.6243 8.09499 12.6519 8.17649 12.7037Z"
        fill="#FD8E1F"
      />
    </svg>
  );
}

function RatingEmptyIcon() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fontSize: "var(--rating-size)",
      }}
    >
      <path
        d="M8.2461 2.72922L9.60729 6.15706C9.67563 6.33201 9.79209 6.48406 9.94321 6.59562L10.2252 6.21365L9.94321 6.59562C10.0949 6.7076 10.2753 6.77419 10.4634 6.78762L10.4633 6.78763L10.4664 6.78783L14.1177 7.0248C14.1321 7.02573 14.1363 7.02932 14.1388 7.03143L14.1388 7.03145C14.1437 7.03561 14.1519 7.04539 14.157 7.06189C14.1621 7.07836 14.1617 7.09338 14.159 7.10367C14.157 7.11122 14.153 7.12054 14.139 7.13221L11.3431 9.4593L11.3431 9.45929L11.3408 9.4612C11.1945 9.58448 11.0861 9.74653 11.0278 9.92872C10.9696 10.1108 10.9639 10.3055 11.0114 10.4907C11.0115 10.4908 11.0115 10.4909 11.0115 10.4911L11.9121 14.0335C11.9176 14.0554 11.9147 14.0676 11.9121 14.0746C11.9086 14.084 11.9016 14.0939 11.8914 14.1016C11.8813 14.1093 11.8731 14.111 11.8702 14.1112C11.8689 14.1113 11.8677 14.1112 11.8659 14.1108C11.8643 14.1103 11.8594 14.1089 11.8512 14.1037L8.73417 12.1289C8.73398 12.1288 8.7338 12.1287 8.73361 12.1286C8.57606 12.0284 8.39323 11.9752 8.20653 11.9752C8.01983 11.9752 7.83701 12.0284 7.67945 12.1286C7.67926 12.1287 7.67908 12.1288 7.67889 12.1289L4.78231 13.9641C4.74847 13.9855 4.72226 13.9889 4.70216 13.9875C4.67907 13.9859 4.65184 13.9767 4.6258 13.957C4.57496 13.9184 4.54613 13.856 4.56642 13.7762L5.40152 10.4911C5.40158 10.4908 5.40165 10.4906 5.40171 10.4903C5.44912 10.3053 5.44341 10.1107 5.38525 9.92872C5.327 9.74653 5.21852 9.58447 5.07227 9.4612L5.07 9.4593L2.27409 7.13221C2.26006 7.12054 2.25608 7.11122 2.25409 7.10367C2.25138 7.09338 2.25095 7.07836 2.25608 7.06189C2.26121 7.04539 2.26932 7.03561 2.27424 7.03145L2.27426 7.03143C2.27676 7.02932 2.28101 7.02573 2.29535 7.0248L5.94663 6.78783L5.94663 6.78784L5.94971 6.78762C6.13778 6.77419 6.31816 6.7076 6.46986 6.59562C6.62099 6.48405 6.73745 6.33198 6.80579 6.15702L8.16697 2.72922L8.16702 2.72924L8.16961 2.72242C8.17245 2.71493 8.1775 2.70848 8.1841 2.70393C8.19069 2.69938 8.19852 2.69694 8.20653 2.69694C8.21455 2.69694 8.22237 2.69938 8.22897 2.70393C8.23556 2.70848 8.24061 2.71493 8.24346 2.72242L8.2434 2.72244L8.2461 2.72922Z"
        stroke="#FD8E1F"
        strokeWidth="0.949541"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
