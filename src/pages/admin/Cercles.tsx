import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Tables } from '../../lib/supabase.types'
import { Badge, Button, Card, Input, Select, Textarea } from '../../ui'

type CercleEvent = Tables<'cercle_events'>
type StatusFilter = 'all' | 'past' | 'upcoming'
const NEW = '__new__'

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

/**
 * There are no fixed formats -- every Cercle is a one-off named event, so
 * this manages a single list distinguished only by `status` (past/upcoming),
 * not two separate concepts the way it used to.
 */
export default function AdminCercles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = (searchParams.get('status') as StatusFilter) || 'all'
  const editing = searchParams.get('edit')

  const [rows, setRows] = useState<CercleEvent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    let query = supabase
      .from('cercle_events')
      .select('*')
      .order('sort_order', { ascending: true })
    if (filter !== 'all') query = query.eq('status', filter)

    const { data, error: loadError } = await query
    if (loadError) setError(loadError.message)
    else setRows(data)
  }, [filter])

  useEffect(() => {
    load()
  }, [load])

  function setFilter(next: StatusFilter) {
    setSearchParams(next === 'all' ? {} : { status: next })
  }

  const editingRow =
    editing && editing !== NEW ? (rows?.find((r) => r.slug === editing) ?? null) : null

  async function handleDelete(id: string) {
    if (!confirm('Delete this event? This can’t be undone.')) return
    const { error: deleteError } = await supabase
      .from('cercle_events')
      .delete()
      .eq('id', id)
    if (deleteError) setError(deleteError.message)
    else {
      setSearchParams(filter === 'all' ? {} : { status: filter })
      load()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-(--radius-control) border px-3 py-1.5 text-sm transition-colors duration-(--duration-base) ${
                filter === f.value
                  ? 'border-(--color-border-strong) bg-(--color-surface-raised) text-(--color-text)'
                  : 'border-(--color-border-subtle) text-(--color-text-muted) hover:text-(--color-text)'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          type="button"
          onClick={() =>
            setSearchParams({
              ...(filter !== 'all' ? { status: filter } : {}),
              edit: NEW,
            })
          }
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
            setSearchParams(filter === 'all' ? {} : { status: filter })
            load()
          }}
          onCancel={() => setSearchParams(filter === 'all' ? {} : { status: filter })}
        />
      )}

      {rows === null ? (
        <p className="text-sm text-(--color-text-subtle)">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-(--color-text-subtle)">Nothing here.</p>
      ) : (
        <ul className="flex list-none flex-col gap-3 p-0">
          {rows.map((row) => (
            <li key={row.id}>
              <Card tone="raised" className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setSearchParams({
                      ...(filter !== 'all' ? { status: filter } : {}),
                      edit: row.slug,
                    })
                  }
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <Badge tone={row.status === 'upcoming' ? 'accent' : 'neutral'}>
                    {row.status}
                  </Badge>
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

function EventForm({
  row,
  onSaved,
  onCancel,
}: {
  row: CercleEvent | null
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
      name: text('name'),
      status: text('status'),
      kicker: text('kicker') || null,
      blurb: text('blurb'),
      description: text('description') || null,
      meta: text('meta') || null,
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
      ? await supabase.from('cercle_events').update(payload).eq('id', row.id)
      : await supabase.from('cercle_events').insert(payload)

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
          <Select
            label="Status"
            name="status"
            defaultValue={row?.status ?? 'upcoming'}
            disabled={saving}
            options={[
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'past', label: 'Past' },
            ]}
          />
          <Input
            label="Name"
            name="name"
            defaultValue={row?.name}
            required
            disabled={saving}
          />
        </div>
        <Input
          label="Kicker (e.g. host, or theme · date)"
          name="kicker"
          defaultValue={row?.kicker ?? ''}
          disabled={saving}
        />
        <Textarea
          label="Blurb (short card copy)"
          name="blurb"
          rows={2}
          defaultValue={row?.blurb}
          required
          disabled={saving}
        />
        <Textarea
          label="Description (longer copy, optional)"
          name="description"
          rows={3}
          defaultValue={row?.description ?? ''}
          disabled={saving}
        />
        <Input
          label="Meta (extra detail line, optional)"
          name="meta"
          defaultValue={row?.meta ?? ''}
          disabled={saving}
        />
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
          label="Photography brief (card)"
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
          label="Photography brief (detail)"
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
