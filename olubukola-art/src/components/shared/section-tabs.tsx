import type { ReactNode } from "react";
import { Tabs, type TabsProps } from "@mantine/core";
import clsx from "clsx";

export type SectionTabItem = {
  value: string;
  label: ReactNode;
};

type Props = Omit<
  TabsProps,
  "children" | "defaultValue" | "variant" | "classNames"
> & {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | null) => void;
  tabs: SectionTabItem[];
  children: ReactNode;
  skeleton?: boolean;
};

export function SectionTabs({
  defaultValue,
  value,
  onChange,
  tabs,
  children,
  skeleton,
  ...props
}: Props) {
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      variant='pills'
      color='dark'
      classNames={{
        tab: clsx({ skeleton }),
      }}
      styles={{
        root: {
          width: "100%",
        },
        list: {
          justifyContent: "start",
          gap: 8,
          flexWrap: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
        },
        tab: {
          minWidth: "fit-content",
          borderRadius: 5,
          border: "1px solid var(--mantine-color-gray-3)",
          padding: "14px 22px",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1,
          textAlign: "center",
        },
        tabLabel: {
          width: "100%",
        },
      }}
      {...props}
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {children}
    </Tabs>
  );
}
