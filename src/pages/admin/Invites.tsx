import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Tables } from '../../lib/supabase.types'
import { Badge, Card, Heading, Select } from '../../ui'

type InviteRequest = Tables<'invite_requests'>
type StatusFilter = 'all' | 'new' | 'read' | 'archived'

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'archived', label: 'Archived' },
]

export default function AdminInvites() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = (searchParams.get('status') as StatusFilter) || 'all'

  const [rows, setRows] = useState<InviteRequest[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    let query = supabase
      .from('invite_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (filter !== 'all') query = query.eq('status', filter)

    const { data, error: loadError } = await query
    if (loadError) setError(loadError.message)
    else setRows(data)
  }, [filter])

  useEffect(() => {
    load()
  }, [load])

  async function setStatus(id: string, status: 'new' | 'read' | 'archived') {
    const { error: updateError } = await supabase
      .from('invite_requests')
      .update({ status })
      .eq('id', id)
    if (updateError) setError(updateError.message)
    else load()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading level={1} size="md">
          Invite requests
        </Heading>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() =>
                setSearchParams(f.value === 'all' ? {} : { status: f.value })
              }
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
      </div>

      {error && <p className="text-sm text-(--color-danger)">{error}</p>}

      {rows === null ? (
        <p className="text-sm text-(--color-text-subtle)">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-(--color-text-subtle)">Nothing here.</p>
      ) : (
        <ul className="flex list-none flex-col gap-4 p-0">
          {rows.map((row) => (
            <li key={row.id}>
              <Card tone="raised" className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-(--color-text)">{row.name}</p>
                    <p className="text-sm text-(--color-text-muted)">{row.email}</p>
                  </div>
                  <Badge>{row.status}</Badge>
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-(--color-text-muted)">
                  {row.city && (
                    <div>
                      <dt className="text-(--color-text-subtle)">City</dt>
                      <dd>{row.city}</dd>
                    </div>
                  )}
                  {row.event_slug && (
                    <div>
                      <dt className="text-(--color-text-subtle)">Event</dt>
                      <dd>{row.event_slug}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-(--color-text-subtle)">Submitted</dt>
                    <dd>{new Date(row.created_at).toLocaleString()}</dd>
                  </div>
                </dl>
                {row.about && (
                  <p className="text-sm leading-relaxed text-(--color-text)">
                    {row.about}
                  </p>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-(--color-text-subtle)">Mark as</span>
                  <Select
                    label="Status"
                    hideLabel
                    className="w-auto"
                    value={row.status}
                    onChange={(e) =>
                      setStatus(row.id, e.target.value as 'new' | 'read' | 'archived')
                    }
                    options={[
                      { value: 'new', label: 'New' },
                      { value: 'read', label: 'Read' },
                      { value: 'archived', label: 'Archived' },
                    ]}
                  />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
