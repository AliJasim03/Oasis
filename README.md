# Oasis Handmade Carpet Centre

A modern, full-featured e-commerce website for Oasis Handmade Carpet Centre, showcasing premium handmade carpets from Persia, Afghanistan, and India.

## Features

### Public Website
- **Home Page**: Hero section with featured carpets and store highlights
- **Product Catalog**: Grid view with advanced filtering and sorting
  - Filter by category, material, and price range
  - Sort by newest, price, and name
- **Product Detail Pages**: Image galleries, detailed information, and WhatsApp inquiry
- **About Us**: Store history and craftsmanship story
- **Contact Page**: Contact form with inquiry management
- **Responsive Design**: Mobile-first approach with full tablet and desktop support
- **Multi-language Support**: English and Arabic with RTL support
- **PWA Capabilities**: Offline browsing and app-like experience

### Admin Dashboard
- **Secure Authentication**: Email/password login with Supabase Auth
- **Product Management**: Full CRUD operations for products
- **Inquiry Management**: View and respond to customer inquiries
- **Dashboard Analytics**: Real-time stats for products and inquiries
- **Protected Routes**: Middleware-based authentication

### Technical Features
- **SEO Optimized**: Dynamic meta tags, sitemap, and robots.txt
- **WhatsApp Integration**: Floating button and product-specific inquiries
- **Image Optimization**: Next.js Image component with lazy loading
- **Type Safety**: Full TypeScript implementation
- **Row Level Security**: Supabase RLS for data protection
- **Responsive Images**: Optimized for all screen sizes

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: SCSS with custom design system
- **Backend**: Supabase (Database, Storage, Auth)
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: SWR for client-side caching

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- (Optional) Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Oasis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update the following variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   NEXT_PUBLIC_WHATSAPP_NUMBER=973XXXXXXXX
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase Database**

   Run the SQL schema file in your Supabase SQL Editor:
   ```bash
   # Copy the contents of supabase-schema.sql
   # and run it in Supabase SQL Editor at:
   # https://app.supabase.com/project/YOUR_PROJECT/sql
   ```

   This will create:
   - Tables: `products`, `product_images`, `categories`, `inquiries`
   - Storage bucket: `product-images`
   - Row Level Security policies
   - Indexes for performance

5. **Create an admin user**

   In Supabase Dashboard:
   - Go to Authentication > Users
   - Click "Add user"
   - Enter email and password for admin access

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /(public)           # Public-facing pages
    /page.tsx         # Home page
    /products         # Product catalog and details
    /about           # About us page
    /contact         # Contact page
  /admin             # Admin dashboard
    /login          # Admin login
    /dashboard      # Admin home
    /products       # Product management
    /inquiries      # Inquiry management
  /api              # API routes
  layout.tsx        # Root layout
  sitemap.ts        # Dynamic sitemap
  robots.ts         # Robots.txt
  not-found.tsx     # 404 page

/components
  /ui               # Reusable UI components
  /layout           # Header, Footer
  /products         # Product-specific components

/lib
  /supabase         # Supabase client and queries
  /i18n             # Internationalization
  /utils            # Helper functions

/styles
  globals.scss      # Global styles
  variables.scss    # Design tokens

/public
  manifest.json     # PWA manifest
  sw.js            # Service worker
  /locales         # Translation files
```

## Database Schema

### Products
- id, name_en, name_ar, description_en, description_ar
- category (Persian/Afghan/Indian/Regional)
- material, origin, price, size, sku
- featured, available
- timestamps

### Product Images
- id, product_id, image_url, is_primary, alt_text

### Categories
- id, name_en, name_ar, slug, description

### Inquiries
- id, customer_name, email, phone, message
- product_id (optional), status
- created_at

## Admin Access

1. Navigate to `/admin/login`
2. Enter your admin credentials
3. Access the dashboard at `/admin/dashboard`

### Admin Features
- View statistics and analytics
- Manage products (add, edit, delete)
- Upload product images
- View and respond to customer inquiries
- Update inquiry status (new, contacted, resolved)

## Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables**
   - Add all environment variables from `.env.local` in Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Configuration

### WhatsApp Integration

Update the WhatsApp number in `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=973XXXXXXXX
```

Format: Country code + number (no spaces or special characters)

### Google Maps (Contact Page)

Add your Google Maps API key:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

### PWA Icons

Replace the following files in `/public`:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)
- `og-image.jpg` (1200x630 pixels for social sharing)

## Customization

### Design System

Edit `/styles/variables.scss` to customize:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Breakpoints

### Translations

Add or modify translations in `/lib/i18n/translations.ts`:
```typescript
export const translations = {
  en: { ... },
  ar: { ... }
}
```

## Security

### Row Level Security (RLS)

All database tables are protected with RLS policies:
- Public read access for products and categories
- Authenticated-only access for admin operations
- Anyone can create inquiries
- Only admins can view/update inquiries

### Authentication

- Supabase Auth handles user authentication
- Middleware protects admin routes
- Session management with HTTP-only cookies

## Performance

- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: SWR for client-side caching
- **Lazy Loading**: Images and components load on demand
- **PWA**: Service worker for offline capabilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Supabase Connection Issues

1. Verify environment variables are correct
2. Check Supabase project status
3. Ensure RLS policies are properly configured
4. Verify API keys have correct permissions

### Image Upload Issues

1. Check storage bucket permissions
2. Verify storage bucket is public
3. Ensure correct CORS configuration
4. Check file size limits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, contact:
- Email: info@oasiscarpets.com
- Phone: +973 XXXX XXXX

## Acknowledgments

- Design inspiration: Traditional carpet patterns and motifs
- Icons: Custom SVG icons
- Fonts: Google Fonts (Playfair Display, Inter)

---

Built with ❤️ for Oasis Handmade Carpet Centre
