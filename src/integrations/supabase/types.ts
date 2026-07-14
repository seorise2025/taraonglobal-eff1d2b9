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
      enquiries: {
        Row: {
          admin_notes: string | null
          buyer_type: string | null
          city: string | null
          company: string | null
          consent: boolean
          created_at: string
          email: string | null
          expected_order_date: string | null
          follow_up_date: string | null
          gst_number: string | null
          id: string
          ip_address: string | null
          message: string | null
          monthly_requirement: string | null
          name: string
          phone: string
          pincode: string | null
          product_needed: string | null
          quantity: string | null
          reference_number: string
          referrer: string | null
          source_page: string | null
          state: string | null
          status: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          whatsapp: string | null
        }
        Insert: {
          admin_notes?: string | null
          buyer_type?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          email?: string | null
          expected_order_date?: string | null
          follow_up_date?: string | null
          gst_number?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          monthly_requirement?: string | null
          name: string
          phone: string
          pincode?: string | null
          product_needed?: string | null
          quantity?: string | null
          reference_number?: string
          referrer?: string | null
          source_page?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Update: {
          admin_notes?: string | null
          buyer_type?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          email?: string | null
          expected_order_date?: string | null
          follow_up_date?: string | null
          gst_number?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          monthly_requirement?: string | null
          name?: string
          phone?: string
          pincode?: string | null
          product_needed?: string | null
          quantity?: string | null
          reference_number?: string
          referrer?: string | null
          source_page?: string | null
          state?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          admin_notes: string | null
          bags: number | null
          buyer_type: string | null
          city: string | null
          company: string | null
          consent: boolean
          created_at: string
          customer_name: string
          email: string | null
          follow_up_date: string | null
          gst_number: string | null
          id: string
          ip_address: string | null
          notes: string | null
          order_number: string
          phone: string
          pincode: string | null
          po_reference: string | null
          product_name: string
          product_slug: string
          quantity: number
          referrer: string | null
          required_delivery_date: string | null
          source_page: string | null
          state: string | null
          status: string
          unit: string
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          whatsapp: string | null
        }
        Insert: {
          admin_notes?: string | null
          bags?: number | null
          buyer_type?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          customer_name: string
          email?: string | null
          follow_up_date?: string | null
          gst_number?: string | null
          id?: string
          ip_address?: string | null
          notes?: string | null
          order_number?: string
          phone: string
          pincode?: string | null
          po_reference?: string | null
          product_name: string
          product_slug: string
          quantity: number
          referrer?: string | null
          required_delivery_date?: string | null
          source_page?: string | null
          state?: string | null
          status?: string
          unit?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Update: {
          admin_notes?: string | null
          bags?: number | null
          buyer_type?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          created_at?: string
          customer_name?: string
          email?: string | null
          follow_up_date?: string | null
          gst_number?: string | null
          id?: string
          ip_address?: string | null
          notes?: string | null
          order_number?: string
          phone?: string
          pincode?: string | null
          po_reference?: string | null
          product_name?: string
          product_slug?: string
          quantity?: number
          referrer?: string | null
          required_delivery_date?: string | null
          source_page?: string | null
          state?: string | null
          status?: string
          unit?: string
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      submission_log: {
        Row: {
          content_hash: string | null
          created_at: string
          form_type: string
          id: string
          ip_address: string
        }
        Insert: {
          content_hash?: string | null
          created_at?: string
          form_type: string
          id?: string
          ip_address: string
        }
        Update: {
          content_hash?: string | null
          created_at?: string
          form_type?: string
          id?: string
          ip_address?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
