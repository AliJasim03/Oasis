 # Quick Setup Guide

## 🚀 Getting Started

### 1. Database Setup (Required)

Before running the application, you need to set up your Supabase database:

1. Go to [Supabase](https://app.supabase.com)
2. Navigate to your project's SQL Editor
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL

This will create:
- All required tables (products, product_images, categories, inquiries)
- Storage bucket for product images
- Row Level Security policies
- Pre-populated categories

### 2. Create Admin User

1. In Supabase Dashboard, go to **Authentication > Users**
2. Click **"Add user"**
3. Enter:
   - Email: your admin email
   - Password: create a secure password
4. Click **"Create user"**

### 3. Update Environment Variables

Update these values in `.env.local`:

```env
# WhatsApp number (with country code, no spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=97312345678

# For production deployment, set your domain
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. Start Development Server

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## 📝 Important Notes

### Admin Login
Use the email and password you created in Supabase Authentication to access the admin dashboard.

### Image Placeholders
The build includes placeholder icons for PWA. Replace these files before deployment:
- `/public/icon-192x192.png` (192x192px)
- `/public/icon-512x512.png` (512x512px)
- `/public/og-image.jpg` (1200x630px)

You can create these using any image editing tool or online icon generators.

### Storage Configuration

Make sure your Supabase Storage bucket is configured correctly:
1. Go to **Storage** in Supabase
2. Find the `product-images` bucket (created by the SQL script)
3. Ensure it's set to **Public**
4. Check CORS settings if you encounter upload issues

### First Product

To add your first product:
1. Login to admin at `/admin/login`
2. Go to **Products**
3. Click **"Add New Product"** (Note: This button is styled but you'll need to implement the form modal)

## 🎨 Customization

### Colors
Edit `/styles/variables.scss` to change:
- Brand colors
- Typography
- Spacing
- Border radius

### Translations
Add or modify translations in `/lib/i18n/translations.ts`

## 🔒 Security Checklist

Before going live:
- [ ] Change default admin password
- [ ] Review RLS policies in Supabase
- [ ] Set up proper CORS in Supabase
- [ ] Update environment variables for production
- [ ] Enable 2FA for Supabase account
- [ ] Set up backup strategy

## 📱 Testing PWA

To test PWA features:
1. Build for production: `npm run build`
2. Start production server: `npm start`
3. Open in Chrome and click "Install" in address bar
4. Test offline functionality

## 🚢 Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard
# Then deploy to production
vercel --prod
```

## 📞 Support

For issues or questions:
- Check the main README.md
- Review Supabase documentation
- Check Next.js documentation

## ✅ Verification Checklist

After setup, verify:
- [ ] Database tables created successfully
- [ ] Categories are populated (4 default categories)
- [ ] Admin login works
- [ ] Can access admin dashboard
- [ ] WhatsApp button appears on pages
- [ ] Language switcher works
- [ ] Build completes without errors

---

Happy building! 🎉
