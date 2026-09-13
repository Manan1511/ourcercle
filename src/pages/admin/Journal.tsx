import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Tables } from '../../lib/supabase.types'
import { Badge, Button, Card, Heading, Input, Textarea } from '../../ui'

type JournalEntry = Tables<'journal_entries'>
const NEW = '__new__'

export default function AdminJournal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const editing = searchParams.get('edit')

  const [rows, setRows] = useState<JournalEntry[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from('journal_entries')
      .select('*')
      .order('sort_order', { ascending: true })
    if (loadError) setError(loadError.message)
    else setRows(data)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function openEdit(slug: string) {
    setSearchParams({ edit: slug })
  }
  function closeEdit() {
    setSearchParams({})
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this entry? This can’t be undone.')) return
    const { error: deleteError } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)
    if (deleteError) setError(deleteError.message)
    else {
      closeEdit()
      load()
    }
  }

  const editingRow =
    editing && editing !== NEW ? (rows?.find((r) => r.slug === editing) ?? null) : null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading level={1} size="md">
          Journal
        </Heading>
        <Button size="sm" type="button" onClick={() => setSearchParams({ edit: NEW })}>
          New entry
        </Button>
      </div>

      {error && <p className="text-sm text-(--color-danger)">{error}</p>}

      {editing && (
        <JournalForm
          key={editing}
          row={editing === NEW ? null : editingRow}
          onSaved={() => {
            closeEdit()
            load()
          }}
          onCancel={closeEdit}
        />
      )}

      {rows === null ? (
        <p className="text-sm text-(--color-text-subtle)">Loading…</p>
      ) : (
        <ul className="flex list-none flex-col gap-3 p-0">
          {rows.map((row) => (
            <li key={row.id}>
              <Card
                tone="raised"
                interactive
                className="flex cursor-pointer items-center justify-between gap-4"
              >
                <button
                  type="button"
                  onClick={() => openEdit(row.slug)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span className="font-medium text-(--color-text)">{row.title}</span>
                  <span className="text-sm text-(--color-text-subtle)">{row.format}</span>
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

function JournalForm({
  row,
  onSaved,
  onCancel,
}: {
  row: JournalEntry | null
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
    const payload = {
      slug: String(data.get('slug') ?? '').trim(),
      format: String(data.get('format') ?? '').trim(),
      title: String(data.get('title') ?? '').trim(),
      excerpt: String(data.get('excerpt') ?? '').trim(),
      image_label: String(data.get('image_label') ?? '').trim() || null,
      image_url: String(data.get('image_url') ?? '').trim() || null,
      image_alt: String(data.get('image_alt') ?? '').trim() || null,
      draft: data.get('draft') === 'on',
      illustrative: data.get('illustrative') === 'on',
      sort_order: Number(data.get('sort_order') ?? 0),
    }

    const { error: saveError } = row
      ? await supabase.from('journal_entries').update(payload).eq('id', row.id)
      : await supabase.from('journal_entries').insert(payload)

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
            hint={row ? 'Slugs can’t be changed once created.' : undefined}
          />
          <Input
            label="Format"
            name="format"
            defaultValue={row?.format}
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
          label="Excerpt"
          name="excerpt"
          rows={3}
          defaultValue={row?.excerpt}
          required
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
          label="Photography brief (shown while the image slot is empty)"
          name="image_label"
          defaultValue={row?.image_label ?? ''}
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
        <label className="flex items-center gap-2 text-sm text-(--color-text)">
          <input
            type="checkbox"
            name="illustrative"
            defaultChecked={row ? row.illustrative : true}
            disabled={saving}
            className="h-4 w-4"
          />
          Illustrative (shows the "Draft" badge on the page itself, separate from Draft
          above)
        </label>
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
