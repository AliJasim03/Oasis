# Deploying Oasis Carpet Centre to Vercel

This guide will walk you through deploying your Next.js application to Vercel.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your repository pushed to your Git provider

## Step 1: Push Your Code to Git Repository

If you haven't already pushed your code to a Git repository:

```bash
# If you haven't set up a remote repository yet
git remote add origin <your-repository-url>

# Push your code
git push -u origin master
```

## Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on **"Add New..."** button in the top right
3. Select **"Project"** from the dropdown
4. Click **"Import Git Repository"**
5. Authorize Vercel to access your Git provider if you haven't already
6. Find and select your **Oasis** repository
7. Click **"Import"**

## Step 3: Configure Project Settings

Vercel should automatically detect that this is a Next.js project. Verify the following settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `next build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

## Step 4: Set Up Environment Variables

Since your project uses Supabase, you need to add environment variables:

1. In the Vercel project setup screen, expand the **"Environment Variables"** section
2. Add your environment variables from `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Add any other environment variables your project needs

**Important**: You can find these values in your Supabase project settings under API settings.

## Step 5: Deploy

1. Click the **"Deploy"** button
2. Vercel will now:
   - Clone your repository
   - Install dependencies
   - Build your project
   - Deploy it to their global edge network
3. Wait for the deployment to complete (usually takes 1-3 minutes)

## Step 6: Access Your Deployed Site

Once deployment is complete:

1. You'll see a **"Visit"** button - click it to view your live site
2. Your site will be available at: `https://your-project-name.vercel.app`
3. Vercel also provides a production URL that you can use

## Step 7: Set Up Custom Domain (Optional)

To use a custom domain:

1. Go to your project dashboard on Vercel
2. Click on **"Settings"** tab
3. Select **"Domains"** from the sidebar
4. Click **"Add"** and enter your domain name
5. Follow the DNS configuration instructions provided by Vercel
6. Add the required DNS records to your domain provider
7. Wait for DNS propagation (can take up to 48 hours, usually much faster)

## Automatic Deployments

Vercel automatically sets up continuous deployment:

- **Production Branch**: Every push to `master` branch triggers a production deployment
- **Preview Deployments**: Every push to other branches creates a preview deployment
- **Pull Requests**: Every PR gets its own preview URL for testing

## Useful Commands for Local Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server locally
npm run start

# Run linter
npm run lint
```

## Updating Environment Variables

If you need to update environment variables after deployment:

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Select **"Environment Variables"** from the sidebar
4. Add, edit, or delete variables as needed
5. Redeploy your project for changes to take effect

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are listed in `package.json`
- Verify that the build works locally with `npm run build`

### Environment Variables Not Working

- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/updating environment variables
- Check that variable names match exactly (case-sensitive)

### Supabase Connection Issues

- Verify your Supabase URL and keys are correct
- Check that your Supabase project is active
- Ensure you're using the correct environment (development vs production)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Supabase with Vercel](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)

## Support

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Supabase Documentation: [supabase.com/docs](https://supabase.com/docs)
