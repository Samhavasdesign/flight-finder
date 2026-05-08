import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Select } from "./Select";

const options = [
  { value: "bordeaux", label: "Bordeaux, France" },
  { value: "burgundy", label: "Burgundy, France" },
  { value: "tuscany", label: "Tuscany, Italy", disabled: true },
];

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    label: "Region",
    placeholder: "Select region...",
    options,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    defaultValue: "bordeaux",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "burgundy",
  },
};
