import { supabase } from './client'
import type { Product, ProductImage, Category, Inquiry, CarpetType } from './types'

// Products
export async function getProducts(options?: {
  category?: string
  carpet_type_id?: string
  featured?: boolean
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('available', true)

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  if (options?.carpet_type_id) {
    query = query.eq('carpet_type_id', options.carpet_type_id)
  }

  if (options?.featured) {
    query = query.eq('featured', true)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('sku', slug)
    .single()

  if (error) throw error
  return data
}

export async function searchProducts(searchTerm: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .or(`name_en.ilike.%${searchTerm}%,name_ar.ilike.%${searchTerm}%,description_en.ilike.%${searchTerm}%`)
    .eq('available', true)

  if (error) throw error
  return data
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name_en', { ascending: true })

  if (error) throw error
  return data
}

// Inquiries
export async function createInquiry(inquiry: {
  customer_name: string
  email: string
  phone: string
  message: string
  product_id?: string
}) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiry as any)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getInquiries() {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*, products(name_en)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'resolved') {
  const { data, error } = await supabase
    .from('inquiries')
    .update({ status } as any)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Admin - Products CRUD
export async function createProduct(product: any) {
  const { data, error } = await supabase
    .from('products')
    .insert(product as any)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProduct(id: string, product: any) {
  const { data, error } = await supabase
    .from('products')
    .update({ ...product, updated_at: new Date().toISOString() } as any)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduct(id: string) {
  // First, get all images associated with this product
  const { data: images, error: fetchError } = await supabase
    .from('product_images')
    .select('image_url')
    .eq('product_id', id)

  if (fetchError) throw fetchError

  // Delete image files from storage if any exist
  if (images && images.length > 0) {
    for (const image of images) {
      // Extract the file path from the full URL
      // URL format: https://{project}.supabase.co/storage/v1/object/public/product-images/{productId}/{filename}
      const urlParts = image.image_url.split('/product-images/')
      if (urlParts.length === 2) {
        const filePath = urlParts[1]

        // Delete from storage (errors are non-blocking to ensure product deletion continues)
        const { error: storageError } = await supabase.storage
          .from('product-images')
          .remove([filePath])

        if (storageError) {
          console.error(`Failed to delete image ${filePath}:`, storageError)
        }
      }
    }
  }

  // Delete product record (this will cascade delete product_images due to foreign key)
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Product Images
export async function uploadProductImage(file: File, productId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${productId}/${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return publicUrl
}

export async function createProductImage(productImage: {
  product_id: string
  image_url: string
  is_primary?: boolean
  alt_text: string
}) {
  const { data, error } = await supabase
    .from('product_images')
    .insert(productImage as any)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProductImage(id: string) {
  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Carpet Types CRUD
export async function getCarpetTypes(options?: {
  category?: string
}) {
  let query = supabase
    .from('carpet_types')
    .select('*')
    .order('sort_order', { ascending: true })

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getCarpetTypeById(id: string) {
  const { data, error } = await supabase
    .from('carpet_types')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getCarpetTypeBySlug(slug: string) {
  const { data, error } = await supabase
    .from('carpet_types')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function createCarpetType(carpetType: {
  name_en: string
  name_ar: string
  slug: string
  description_en: string
  description_ar: string
  category: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
  sort_order?: number
}) {
  const { data, error } = await supabase
    .from('carpet_types')
    .insert(carpetType as any)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCarpetType(id: string, carpetType: {
  name_en?: string
  name_ar?: string
  slug?: string
  description_en?: string
  description_ar?: string
  category?: 'Persian' | 'Afghan' | 'Indian' | 'Regional'
  sort_order?: number
}) {
  const { data, error } = await supabase
    .from('carpet_types')
    .update({ ...carpetType, updated_at: new Date().toISOString() } as any)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCarpetType(id: string) {
  const { error } = await supabase
    .from('carpet_types')
    .delete()
    .eq('id', id)

  if (error) throw error
}
