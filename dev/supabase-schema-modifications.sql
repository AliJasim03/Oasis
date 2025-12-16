-- Modifications to add carpet_types table
-- This table stores detailed descriptions about different types of carpets

CREATE TABLE IF NOT EXISTS carpet_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en VARCHAR(255) NOT NULL UNIQUE,i lo
  name_ar VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Persian', 'Afghan', 'Indian', 'Regional')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add carpet_type_id to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS carpet_type_id UUID REFERENCES carpet_types(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_carpet_types_category ON carpet_types(category);
CREATE INDEX IF NOT EXISTS idx_carpet_types_slug ON carpet_types(slug);
CREATE INDEX IF NOT EXISTS idx_products_carpet_type_id ON products(carpet_type_id);

-- Enable RLS on carpet_types table
ALTER TABLE carpet_types ENABLE ROW LEVEL SECURITY;

-- Carpet types policies (public read)
CREATE POLICY "Carpet types are viewable by everyone"
  ON carpet_types FOR SELECT
  USING (true);

CREATE POLICY "Carpet types are editable by authenticated users only"
  ON carpet_types FOR ALL
  USING (auth.role() = 'authenticated');

-- Trigger for carpet_types updated_at
CREATE TRIGGER update_carpet_types_updated_at
  BEFORE UPDATE ON carpet_types
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();