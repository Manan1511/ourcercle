import { Button, Input } from 'ourcercle'

export const States = () => (
  <div className="flex max-w-md flex-col gap-5 p-6">
    <Input label="Full name" placeholder="Jane Mercier" />
    <Input
      label="Email"
      type="email"
      placeholder="you@example.com"
      hint="We only use this to reply, no newsletters unless you ask."
      required
    />
    <Input label="City" defaultValue="not a real city" error="Tell us where you're based." />
    <Input label="Referral code" defaultValue="CERCLE-2026" disabled />
  </div>
)

export const InAForm = () => (
  <form className="flex max-w-md flex-col gap-5 p-6">
    <Input label="Full name" placeholder="Jane Mercier" required />
    <Input label="Email" type="email" placeholder="you@example.com" required />
    <Button type="submit" className="self-start">
      Send my request
    </Button>
  </form>
)

export const LabelHidden = () => (
  <div className="flex max-w-md items-end gap-3 p-6">
    <div className="flex-1">
      <Input label="Search" hideLabel placeholder="Search the journal" />
    </div>
    <Button variant="outline">Search</Button>
  </div>
)
