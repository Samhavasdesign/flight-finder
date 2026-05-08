import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox, Radio } from "./SelectionControl";

const meta = {
  title: "Components/SelectionControl/Checkbox",
  component: Checkbox,
  args: {
    label: "Accept terms",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    label: "Accepted",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled checkbox",
    labelItalic: true,
  },
};

export const RadioDefault: Story = {
  name: "Radio / Default",
  render: () => <Radio name="trip" label="One-way" />,
};

export const RadioChecked: Story = {
  name: "Radio / Checked",
  render: () => <Radio name="trip" label="Round-trip" defaultChecked />,
};

export const RadioDisabled: Story = {
  name: "Radio / Disabled",
  render: () => (
    <Radio name="trip" label="Disabled option" disabled labelItalic />
  ),
};
