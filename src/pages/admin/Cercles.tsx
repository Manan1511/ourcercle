import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Tables } from '../../lib/supabase.types'
import { Badge, Button, Card, Input, Textarea } from '../../ui'

type CercleFormat = Tables<'cercle_formats'>
type UpcomingEvent = Tables<'upcoming_events'>
const NEW = '__new__'

export default function AdminCercles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') === 'events' ? 'events' : 'formats'

  function setTab(next: 'formats' | 'events') {
    setSearchParams(next === 'formats' ? {} : { tab: next })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <TabButton active={tab === 'formats'} onClick={() => setTab('formats')}>
          Formats
        </TabButton>
        <TabButton active={tab === 'events'} onClick={() => setTab('events')}>
          Upcoming events
        </TabButton>
      </div>
      {tab === 'formats' ? <FormatsPanel /> : <EventsPanel />}
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-(--radius-control) border px-3 py-1.5 text-sm transition-colors duration-(--duration-base) ${
        active
          ? 'border-(--color-border-strong) bg-(--color-surface-raised) text-(--color-text)'
          : 'border-(--color-border-subtle) text-(--color-text-muted) hover:text-(--color-text)'
      }`}
    >
      {children}
    </button>
  )
}

function FormatsPanel() {
  const [searchParams, setSearchParams] = useSearchParams()
  const editing = searchParams.get('edit')
  const [rows, setRows] = useState<CercleFormat[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from('cercle_formats')
      .select('*')
      .order('sort_order', { ascending: true })
    if (loadError) setError(loadError.message)
    else setRows(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const editingRow =
    editing && editing !== NEW ? (rows?.find((r) => r.slug === editing) ?? null) : null

  async function handleDelete(id: string) {
    if (!confirm('Delete this format? This can’t be undone.')) return
    const { error: deleteError } = await supabase
      .from('cercle_formats')
      .delete()
      .eq('id', id)
    if (deleteError) setError(deleteError.message)
    else {
      setSearchParams({ tab: 'formats' })
      load()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          size="sm"
          type="button"
          onClick={() => setSearchParams({ tab: 'formats', edit: NEW })}
        >
          New format
        </Button>
      </div>
      {error && <p className="text-sm text-(--color-danger)">{error}</p>}
      {editing && (
        <FormatForm
          key={editing}
          row={editing === NEW ? null : editingRow}
          onSaved={() => {
            setSearchParams({ tab: 'formats' })
            load()
          }}
          onCancel={() => setSearchParams({ tab: 'formats' })}
        />
      )}
      {rows === null ? (
        <p className="text-sm text-(--color-text-subtle)">Loading…</p>
      ) : (
        <ul className="flex list-none flex-col gap-3 p-0">
          {rows.map((row) => (
            <li key={row.id}>
              <Card tone="raised" className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSearchParams({ tab: 'formats', edit: row.slug })}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span className="text-sm text-(--color-text-subtle)">{row.number}</span>
                  <span className="font-medium text-(--color-text)">{row.name}</span>
                </button>
                {row.draft && <Badge tone="warning">Draft</Badge>}
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FormatForm({
  row,
  onSaved,
  onCancel,
}: {
  row: CercleFormat | null
  onSaved: () => void
  onCancel: () => void
}) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const data = new FormData(event.currentTarget)
    const text = (key: string) => String(data.get(key) ?? '').trim()
    const payload = {
      slug: text('slug'),
      number: text('number'),
      name: text('name'),
      blurb: text('blurb'),
      description: text('description'),
      seats: text('seats') || null,
      meta: text('meta'),
      image_url: text('image_url') || null,
      image_alt: text('image_alt') || null,
      image_label: text('image_label') || null,
      detail_image_url: text('detail_image_url') || null,
      detail_image_alt: text('detail_image_alt') || null,
      detail_image_label: text('detail_image_label') || null,
      draft: data.get('draft') === 'on',
      sort_order: Number(data.get('sort_order') ?? 0),
    }

    const { error: saveError } = row
      ? await supabase.from('cercle_formats').update(payload).eq('id', row.id)
      : await supabase.from('cercle_formats').insert(payload)

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
    } else {
      onSaved()
    }
  }

  return (
    <Card tone="raised" className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Slug"
            name="slug"
            defaultValue={row?.slug}
            required
            disabled={saving || !!row}
          />
          <Input
            label="Number (e.g. No. 1)"
            name="number"
            defaultValue={row?.number}
            required
            disabled={saving}
          />
          <Input
            label="Name"
            name="name"
            defaultValue={row?.name}
            required
            disabled={saving}
          />
        </div>
        <Textarea
          label="Blurb (homepage card)"
          name="blurb"
          rows={2}
          defaultValue={row?.blurb}
          required
          disabled={saving}
        />
        <Textarea
          label="Description (/cercles)"
          name="description"
          rows={3}
          defaultValue={row?.description}
          required
          disabled={saving}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Seats (short badge, leave blank to hide)"
            name="seats"
            defaultValue={row?.seats ?? ''}
            disabled={saving}
          />
          <Input
            label="Meta (full detail line)"
            name="meta"
            defaultValue={row?.meta}
            required
            disabled={saving}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Image URL"
            name="image_url"
            defaultValue={row?.image_url ?? ''}
            disabled={saving}
          />
          <Input
            label="Image alt text"
            name="image_alt"
            defaultValue={row?.image_alt ?? ''}
            disabled={saving}
          />
        </div>
        <Input
          label="Photography brief (homepage)"
          name="image_label"
          defaultValue={row?.image_label ?? ''}
          disabled={saving}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Detail image URL"
            name="detail_image_url"
            defaultValue={row?.detail_image_url ?? ''}
            disabled={saving}
          />
          <Input
            label="Detail image alt text"
            name="detail_image_alt"
            defaultValue={row?.detail_image_alt ?? ''}
            disabled={saving}
          />
        </div>
        <Input
          label="Photography brief (/cercles detail)"
          name="detail_image_label"
          defaultValue={row?.detail_image_label ?? ''}
          disabled={saving}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Sort order"
            name="sort_order"
            type="number"
            defaultValue={row?.sort_order ?? 0}
            disabled={saving}
          />
          <label className="flex items-end gap-2 pb-2.5 text-sm text-(--color-text)">
            <input
              type="checkbox"
              name="draft"
              defaultChecked={row ? row.draft : true}
              disabled={saving}
              className="h-4 w-4"
            />
            Draft (unchecked = published, triggers a rebuild)
          </label>
        </div>
        {error && <p className="text-sm text-(--color-danger)">{error}</p>}
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button variant="outline" type="button" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}

function EventsPanel() {
  const [searchParams, setSearchParams] = useSearchParams()
  const editing = searchParams.get('edit')
  const [rows, setRows] = useState<UpcomingEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from('upcoming_events')
      .select('*')
      .order('sort_order', { ascending: true })
    if (loadError) setError(loadError.message)
    else setRows(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const editingRow =
    editing && editing !== NEW ? (rows?.find((r) => r.slug === editing) ?? null) : null

  async function handleDelete(id: string) {
    if (!confirm('Delete this event? This can’t be undone.')) return
    const { error: deleteError } = await supabase
      .from('upcoming_events')
      .delete()
      .eq('id', id)
    if (deleteError) setError(deleteError.message)
    else {
      setSearchParams({ tab: 'events' })
      load()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          size="sm"
          type="button"
          onClick={() => setSearchParams({ tab: 'events', edit: NEW })}
        >
          New event
        </Button>
      </div>
      {error && <p className="text-sm text-(--color-danger)">{error}</p>}
      {editing && (
        <EventForm
          key={editing}
          row={editing === NEW ? null : editingRow}
          onSaved={() => {
            setSearchParams({ tab: 'events' })
            load()
          }}
          onCancel={() => setSearchParams({ tab: 'events' })}
        />
      )}
      {rows === null ? (
        <p className="text-sm text-(--color-text-subtle)">Loading…</p>
      ) : (
        <ul className="flex list-none flex-col gap-3 p-0">
          {rows.map((row) => (
            <li key={row.id}>
              <Card tone="raised" className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSearchParams({ tab: 'events', edit: row.slug })}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span className="font-medium text-(--color-text)">{row.title}</span>
                  <span className="text-sm text-(--color-text-subtle)">{row.kicker}</span>
                </button>
                {row.draft && <Badge tone="warning">Draft</Badge>}
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function EventForm({
  row,
  onSaved,
  onCancel,
}: {
  row: UpcomingEvent | null
  onSaved: () => void
  onCancel: () => void
}) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const data = new FormData(event.currentTarget)
    const text = (key: string) => String(data.get(key) ?? '').trim()
    const payload = {
      slug: text('slug'),
      kicker: text('kicker'),
      title: text('title'),
      blurb: text('blurb'),
      draft: data.get('draft') === 'on',
      sort_order: Number(data.get('sort_order') ?? 0),
    }

    const { error: saveError } = row
      ? await supabase.from('upcoming_events').update(payload).eq('id', row.id)
      : await supabase.from('upcoming_events').insert(payload)

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
    } else {
      onSaved()
    }
  }

  return (
    <Card tone="raised" className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Slug"
            name="slug"
            defaultValue={row?.slug}
            required
            disabled={saving || !!row}
          />
          <Input
            label="Kicker (e.g. Salon · November)"
            name="kicker"
            defaultValue={row?.kicker}
            required
            disabled={saving}
          />
        </div>
        <Input
          label="Title"
          name="title"
          defaultValue={row?.title}
          required
          disabled={saving}
        />
        <Textarea
          label="Blurb"
          name="blurb"
          rows={2}
          defaultValue={row?.blurb}
          required
          disabled={saving}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Sort order"
            name="sort_order"
            type="number"
            defaultValue={row?.sort_order ?? 0}
            disabled={saving}
          />
          <label className="flex items-end gap-2 pb-2.5 text-sm text-(--color-text)">
            <input
              type="checkbox"
              name="draft"
              defaultChecked={row ? row.draft : true}
              disabled={saving}
              className="h-4 w-4"
            />
            Draft (unchecked = published, triggers a rebuild)
          </label>
        </div>
        {error && <p className="text-sm text-(--color-danger)">{error}</p>}
        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
          <Button variant="outline" type="button" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
