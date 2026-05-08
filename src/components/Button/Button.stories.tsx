import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Book now",
    variant: "primary",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary action" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Learn more" },
};

export const Tonal: Story = {
  args: { variant: "tonal", children: "Tonal action" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled button" },
};

export const IconOnly: Story = {
  args: { iconOnly: "✈", "aria-label": "Search flights" },
};
