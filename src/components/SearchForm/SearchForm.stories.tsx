import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchForm } from "./SearchForm";

const meta = {
  title: "Components/SearchForm",
  component: SearchForm,
  args: {
    onSearch: (params) => {
      // Storybook-only handler for visual testing.
      // eslint-disable-next-line no-console
      console.log("Search submitted", params);
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
