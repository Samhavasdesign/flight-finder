import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  args: {},
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    defaultValue: new Date(2026, 3, 15),
  },
};

export const BoundedRange: Story = {
  args: {
    minDate: new Date(2026, 3, 10),
    maxDate: new Date(2026, 3, 20),
    defaultValue: new Date(2026, 3, 15),
  },
};
