# My Online Store

![App Preview](https://imgix.cosmicjs.com/55740530-2c87-11f1-a673-651b248ccb06-autopilot-photo-1521401830884-6c03c1c87ebb-1774909519095.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern e-commerce storefront built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com) CMS. Browse products by category, read customer reviews, and enjoy a stunning responsive shopping experience.

## Features

- 🏠 **Dynamic Homepage** — Hero banner, featured products, categories, and reviews
- 📦 **Product Catalog** — Browse all products with category filtering and inventory badges
- 🏷️ **Category Browsing** — Explore products organized by category
- ⭐ **Customer Reviews** — Star ratings and testimonials linked to products
- 🔍 **Product Details** — Full product pages with galleries, reviews, and pricing
- 📱 **Responsive Design** — Beautiful on mobile, tablet, and desktop
- ⚡ **Server Components** — Fast, SEO-friendly rendering with Next.js 16
- 🎨 **Modern UI** — Tailwind CSS with smooth animations and hover effects

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69caf80a5e16379a526ee30d&clone_repository=69caf9455e16379a526ee35d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: product-categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-online-store

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file with these variables:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| Products | `products` | Store products with pricing, images, and inventory |
| Product Categories | `product-categories` | Product organization categories |
| Reviews | `reviews` | Customer reviews with star ratings |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->