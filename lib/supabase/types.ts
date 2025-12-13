export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name_en: string
          name_ar: string
          description_en: string
          description_ar: string
          category: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
          material: string
          origin: string
          price: number
          size: string
          sku: string
          featured: boolean
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_ar: string
          description_en: string
          description_ar: string
          category: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
          material: string
          origin: string
          price: number
          size: string
          sku: string
          featured?: boolean
          available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_ar?: string
          description_en?: string
          description_ar?: string
          category?: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
          material?: string
          origin?: string
          price?: number
          size?: string
          sku?: string
          featured?: boolean
          available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          is_primary: boolean
          alt_text: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          is_primary?: boolean
          alt_text: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          is_primary?: boolean
          alt_text?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name_en: string
          name_ar: string
          slug: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_ar: string
          slug: string
          description?: string
          created_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_ar?: string
          slug?: string
          description?: string
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          customer_name: string
          email: string
          phone: string
          message: string
          product_id: string | null
          status: 'new' | 'contacted' | 'resolved'
          created_at: string
        }
        Insert: {
          id?: string
          customer_name: string
          email: string
          phone: string
          message: string
          product_id?: string | null
          status?: 'new' | 'contacted' | 'resolved'
          created_at?: string
        }
        Update: {
          id?: string
          customer_name?: string
          email?: string
          phone?: string
          message?: string
          product_id?: string | null
          status?: 'new' | 'contacted' | 'resolved'
          created_at?: string
        }
      }
      carpet_types: {
        Row: {
          id: string
          name_en: string
          name_ar: string
          slug: string
          description_en: string
          description_ar: string
          category: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_ar: string
          slug: string
          description_en: string
          description_ar: string
          category: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_ar?: string
          slug?: string
          description_en?: string
          description_ar?: string
          category?: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Helper types
export type Product = Database['public']['Tables']['products']['Row']
export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type CarpetType = Database['public']['Tables']['carpet_types']['Row']
