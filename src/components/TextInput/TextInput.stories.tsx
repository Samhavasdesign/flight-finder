import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextInput } from "./TextInput";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  args: {
    label: "Full name",
    placeholder: "Enter your full name",
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "As shown on passport",
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Please enter a valid name",
    defaultValue: "!",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Samantha Havas",
  },
};

export const FilledMultiline: Story = {
  args: {
    label: "Notes",
    multiline: true,
    filled: true,
    rows: 5,
    placeholder: "Add tasting notes...",
  },
};
