/**
 * AUTO-GENERATED via the Supabase MCP's `generate_typescript_types`.
 * Do not hand-edit -- regenerate after every migration in
 * supabase/migrations/ instead, so this never drifts from the real schema.
 */
export type Json =
  string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      cercle_formats: {
        Row: {
          blurb: string
          created_at: string
          description: string
          detail_image_alt: string | null
          detail_image_label: string | null
          detail_image_url: string | null
          draft: boolean
          id: string
          image_alt: string | null
          image_label: string | null
          image_url: string | null
          meta: string
          name: string
          number: string
          seats: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          blurb: string
          created_at?: string
          description: string
          detail_image_alt?: string | null
          detail_image_label?: string | null
          detail_image_url?: string | null
          draft?: boolean
          id?: string
          image_alt?: string | null
          image_label?: string | null
          image_url?: string | null
          meta: string
          name: string
          number: string
          seats?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          blurb?: string
          created_at?: string
          description?: string
          detail_image_alt?: string | null
          detail_image_label?: string | null
          detail_image_url?: string | null
          draft?: boolean
          id?: string
          image_alt?: string | null
          image_label?: string | null
          image_url?: string | null
          meta?: string
          name?: string
          number?: string
          seats?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      invite_requests: {
        Row: {
          about: string | null
          city: string | null
          created_at: string
          email: string
          event_slug: string | null
          id: string
          name: string
          status: string
        }
        Insert: {
          about?: string | null
          city?: string | null
          created_at?: string
          email: string
          event_slug?: string | null
          id?: string
          name: string
          status?: string
        }
        Update: {
          about?: string | null
          city?: string | null
          created_at?: string
          email?: string
          event_slug?: string | null
          id?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          created_at: string
          draft: boolean
          excerpt: string
          format: string
          id: string
          illustrative: boolean
          image_alt: string | null
          image_label: string | null
          image_url: string | null
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          draft?: boolean
          excerpt: string
          format: string
          id?: string
          illustrative?: boolean
          image_alt?: string | null
          image_label?: string | null
          image_url?: string | null
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          draft?: boolean
          excerpt?: string
          format?: string
          id?: string
          illustrative?: boolean
          image_alt?: string | null
          image_label?: string | null
          image_url?: string | null
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      upcoming_events: {
        Row: {
          blurb: string
          created_at: string
          draft: boolean
          id: string
          kicker: string
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          blurb: string
          created_at?: string
          draft?: boolean
          id?: string
          kicker: string
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          blurb?: string
          created_at?: string
          draft?: boolean
          id?: string
          kicker?: string
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
