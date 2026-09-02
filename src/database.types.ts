export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      clientes: {
        Row: {
          apellidos: string | null
          asignado_a: string | null
          ciudad: string | null
          codigo_postal: string | null
          created_at: string
          created_by: string | null
          direccion: string | null
          email: string | null
          empresa: string | null
          estado: string | null
          estatus: string
          fecha_nacimiento: string | null
          id: string
          lead_id: string | null
          nombre: string
          notas: string | null
          pais: string | null
          tax_id: string | null
          telefono: string | null
          tipo_cliente: string
          updated_at: string
          valor_total: number
        }
        Insert: {
          apellidos?: string | null
          asignado_a?: string | null
          ciudad?: string | null
          codigo_postal?: string | null
          created_at?: string
          created_by?: string | null
          direccion?: string | null
          email?: string | null
          empresa?: string | null
          estado?: string | null
          estatus?: string
          fecha_nacimiento?: string | null
          id?: string
          lead_id?: string | null
          nombre: string
          notas?: string | null
          pais?: string | null
          tax_id?: string | null
          telefono?: string | null
          tipo_cliente?: string
          updated_at?: string
          valor_total?: number
        }
        Update: {
          apellidos?: string | null
          asignado_a?: string | null
          ciudad?: string | null
          codigo_postal?: string | null
          created_at?: string
          created_by?: string | null
          direccion?: string | null
          email?: string | null
          empresa?: string | null
          estado?: string | null
          estatus?: string
          fecha_nacimiento?: string | null
          id?: string
          lead_id?: string | null
          nombre?: string
          notas?: string | null
          pais?: string | null
          tax_id?: string | null
          telefono?: string | null
          tipo_cliente?: string
          updated_at?: string
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "clientes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: true
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes_productos: {
        Row: {
          cantidad: number
          cliente_id: string
          created_at: string
          fecha_adquisicion: string
          id: string
          notas: string | null
          precio_acordado: number | null
          producto_id: string
        }
        Insert: {
          cantidad?: number
          cliente_id: string
          created_at?: string
          fecha_adquisicion?: string
          id?: string
          notas?: string | null
          precio_acordado?: number | null
          producto_id: string
        }
        Update: {
          cantidad?: number
          cliente_id?: string
          created_at?: string
          fecha_adquisicion?: string
          id?: string
          notas?: string | null
          precio_acordado?: number | null
          producto_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_productos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_productos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      contactos: {
        Row: {
          asunto: string | null
          cliente_id: string | null
          created_at: string
          direccion: string
          fecha_contacto: string
          id: string
          lead_id: string | null
          proximo_seguimiento: string | null
          realizado_por: string | null
          resultado: string | null
          resumen: string | null
          tipo: string
        }
        Insert: {
          asunto?: string | null
          cliente_id?: string | null
          created_at?: string
          direccion?: string
          fecha_contacto?: string
          id?: string
          lead_id?: string | null
          proximo_seguimiento?: string | null
          realizado_por?: string | null
          resultado?: string | null
          resumen?: string | null
          tipo: string
        }
        Update: {
          asunto?: string | null
          cliente_id?: string | null
          created_at?: string
          direccion?: string
          fecha_contacto?: string
          id?: string
          lead_id?: string | null
          proximo_seguimiento?: string | null
          realizado_por?: string | null
          resultado?: string | null
          resumen?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "contactos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contactos_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          apellidos: string | null
          asignado_a: string | null
          campana: string | null
          cargo: string | null
          created_at: string
          created_by: string | null
          email: string | null
          empresa: string | null
          estado: string
          fecha_conversion: string | null
          id: string
          nombre: string
          notas: string | null
          origen: string
          presupuesto_estimado: number | null
          puntuacion: number | null
          telefono: string | null
          updated_at: string
          url_origen: string | null
        }
        Insert: {
          apellidos?: string | null
          asignado_a?: string | null
          campana?: string | null
          cargo?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa?: string | null
          estado?: string
          fecha_conversion?: string | null
          id?: string
          nombre: string
          notas?: string | null
          origen?: string
          presupuesto_estimado?: number | null
          puntuacion?: number | null
          telefono?: string | null
          updated_at?: string
          url_origen?: string | null
        }
        Update: {
          apellidos?: string | null
          asignado_a?: string | null
          campana?: string | null
          cargo?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          empresa?: string | null
          estado?: string
          fecha_conversion?: string | null
          id?: string
          nombre?: string
          notas?: string | null
          origen?: string
          presupuesto_estimado?: number | null
          puntuacion?: number | null
          telefono?: string | null
          updated_at?: string
          url_origen?: string | null
        }
        Relationships: []
      }
      leads_productos: {
        Row: {
          created_at: string
          interes: string | null
          lead_id: string
          notas: string | null
          producto_id: string
        }
        Insert: {
          created_at?: string
          interes?: string | null
          lead_id: string
          notas?: string | null
          producto_id: string
        }
        Update: {
          created_at?: string
          interes?: string | null
          lead_id?: string
          notas?: string | null
          producto_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_productos_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_productos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          categoria: string | null
          created_at: string
          created_by: string | null
          descripcion: string | null
          destacado: boolean
          disponible: boolean
          id: string
          imagen_url: string | null
          metadata: Json
          moneda: string
          nombre: string
          precio: number
          sku: string | null
          slug: string | null
          stock: number
          tax_rate: number
          updated_at: string
        }
        Insert: {
          categoria?: string | null
          created_at?: string
          created_by?: string | null
          descripcion?: string | null
          destacado?: boolean
          disponible?: boolean
          id?: string
          imagen_url?: string | null
          metadata?: Json
          moneda?: string
          nombre: string
          precio?: number
          sku?: string | null
          slug?: string | null
          stock?: number
          tax_rate?: number
          updated_at?: string
        }
        Update: {
          categoria?: string | null
          created_at?: string
          created_by?: string | null
          descripcion?: string | null
          destacado?: boolean
          disponible?: boolean
          id?: string
          imagen_url?: string | null
          metadata?: Json
          moneda?: string
          nombre?: string
          precio?: number
          sku?: string | null
          slug?: string | null
          stock?: number
          tax_rate?: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
