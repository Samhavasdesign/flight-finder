import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { Checkbox, Radio } from '@/components/SelectionControl';
import { Toggle } from '@/components/Toggle';
import { Select } from '@/components/Select';
import { DatePicker } from '@/components/DatePicker';

export default function TestPage() {
  return (
    <div
      style={{
        padding: '64px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        maxWidth: '600px',
        backgroundColor: 'var(--color-background-default-secondary)',
      }}
    >
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="tertiary">Tertiary Button</Button>
      <Button variant="tonal">Tonal Button</Button>

      <TextInput label="Default Input" placeholder="Full Name" />
      <TextInput label="Error Input" errorMessage="Please enter a valid vintage year" defaultValue="invalid_entry" />
      <TextInput label="Multiline" multiline placeholder="Tasting notes..." />

      <Checkbox label="Unselected Default" />
      <Checkbox label="Selected State" defaultChecked />
      <Radio name="test" label="Unselected Option" />
      <Radio name="test" label="Selected Option" defaultChecked />

      <Toggle label="Notification Alerts" description="Receive real-time shipment updates" />

      <Select
        label="Region Select"
        placeholder="Select region..."
        options={[
          { value: 'bordeaux', label: 'Bordeaux, France' },
          { value: 'burgundy', label: 'Burgundy, France' },
          { value: 'tuscany', label: 'Tuscany, Italy' },
        ]}
      />

      <DatePicker />
    </div>
  );
}