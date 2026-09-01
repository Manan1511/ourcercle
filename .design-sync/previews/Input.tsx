import { Button, Input } from 'ourcercle'

export const States = () => (
  <div className="flex max-w-md flex-col gap-5 p-6">
    <Input label="Full name" placeholder="Jane Mercier" />
    <Input
      label="Email address"
      type="email"
      placeholder="you@example.com"
      hint="We'll only use this to reply to your enquiry."
      required
    />
    <Input
      label="Postcode"
      defaultValue="not-a-postcode"
      error="Enter a valid UK postcode."
    />
    <Input label="Account number" defaultValue="8842 1190" disabled />
  </div>
)

export const InAForm = () => (
  <form className="flex max-w-md flex-col gap-5 p-6">
    <Input label="Name" placeholder="Jane Mercier" required />
    <Input label="Email" type="email" placeholder="you@example.com" required />
    <Button type="submit" className="self-start">
      Send enquiry
    </Button>
  </form>
)

export const LabelHidden = () => (
  <div className="flex max-w-md items-end gap-3 p-6">
    <div className="flex-1">
      <Input label="Search" hideLabel placeholder="Search the collection" />
    </div>
    <Button variant="outline">Search</Button>
  </div>
)
