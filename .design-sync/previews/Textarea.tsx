import { Button, Textarea } from 'ourcercle'

export const States = () => (
  <div className="flex max-w-md flex-col gap-5 p-6">
    <Textarea
      label="What draws you here?"
      placeholder="A curiosity, a story, the kind of table you’d love to sit at…"
    />
    <Textarea
      label="Anything else?"
      hint="Optional: a sentence is plenty."
      rows={3}
    />
    <Textarea
      label="Dietary needs"
      defaultValue="Everything, no restrictions"
      error="This field is required."
    />
    <Textarea label="Notes" defaultValue="Locked for review." disabled />
  </div>
)

export const InAForm = () => (
  <form className="flex max-w-md flex-col gap-5 p-6">
    <Textarea
      label="What draws you here?"
      placeholder="A curiosity, a story, the kind of table you’d love to sit at…"
      required
    />
    <Button type="submit" className="self-start">
      Send my request
    </Button>
  </form>
)
