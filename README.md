# University AI Research Center Website

A modern, comprehensive website for a university research and product lab built with Next.js, featuring research publications, bootcamps, MDX-powered insights blog, global search, persistent audio player, and bold kree8.agency-inspired design.

## Features

- **Bold, Modern Design**: Cream background with striking black typography inspired by kree8.agency
- **MDX-Powered Content**: Write articles in Markdown with React components embedded
- **Global Search**: Command+K search across all content (products, research, insights, pages)
- **Persistent Audio Player**: Podcast player that works across page navigation
- **Responsive Gallery**: Next.js Conf-style image gallery with modal lightbox and carousel
- **Dynamic Filtering**: Filter products by domain, research by category, careers by department
- **LLM Discoverable**: Comprehensive SEO with sitemap, RSS feeds, robots.txt, and llms.txt
- **Product Showcase**: Detailed product pages with video/slide viewers and PDF modals
- **Career Portal**: Job listings with filters and application process
- **FAQ Section**: Accordion-style frequently asked questions

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **Content**: MDX with gray-matter for frontmatter
- **Typography**: Inter font family
- **Audio**: HTML5 Audio with global context
- **Search**: Client-side fuzzy search with keyboard navigation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone or download this project
2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
/app
  /layout.tsx              # Root layout with Inter font & audio provider
  /page.tsx                # Home page with hero, stats, projects, FAQ
  /products                # Products catalog & detail pages
  /research                # Research papers list & detail pages
  /insights                # MDX blog articles (list & detail)
  /bootcamps               # Bootcamp program listings
  /careers                 # Job openings with filters
  /services                # Services & consulting offerings
  /podcast                 # Podcast episodes with audio player
  /teams                   # Team member profiles
  /gallery                 # Photo gallery with lightbox
  /contact                 # Contact form
  /newsletter              # Newsletter subscription
  /not-found.tsx           # Custom 404 page
  /sitemap.ts              # Auto-generated sitemap
  /robots.ts               # Robots.txt configuration
  /api/rss                 # RSS feed for insights
  /api/podcast-rss         # RSS feed for podcasts
  /llms-full               # Full content API for LLMs

/components
  header.tsx               # Main navigation with global search
  footer.tsx               # Site footer
  hero-section.tsx         # Animated hero with grid background
  featured-projects.tsx    # Research showcase cards
  latest-insights.tsx      # Blog preview cards
  newsletter-cta.tsx       # Newsletter signup CTA
  faq-section.tsx          # Accordion FAQ
  global-search.tsx        # Command+K search modal
  floating-audio-player.tsx # Persistent podcast player
  mdx-components.tsx       # Custom MDX renderers
  podcast-episode.tsx      # Audio player component
  team-member.tsx          # Team profile card
  contact-form.tsx         # Contact form
  /ui/*                    # shadcn/ui components

/content
  /insights                # MDX articles go here
    journalistic-integrity.mdx

/contexts
  audio-player-context.tsx # Global audio state management

/lib
  mdx.ts                   # MDX utilities (getAllArticles, getArticleBySlug)

/public                    # Static assets (images, audio, PDFs)
  /audio                   # Podcast episode audio files
  /images                  # Article and page images
  llms.txt                 # LLM discovery file
\`\`\`

## Adding MDX Articles

### 1. Create an MDX file in `content/insights/`

All blog articles are stored as `.mdx` files in the `content/insights/` directory.

\`\`\`mdx
---
title: "Your Article Title"
excerpt: "A brief description for preview cards and SEO"
author: "Author Name or Organization"
date: "2025-01-15"
readTime: "8 min"
category: "Machine Learning"
image: "/article-cover-image.jpg"
tags: ["AI", "machine-learning", "research"]
---

Your article content here in Markdown format...

## Section Headings

You can use all standard Markdown syntax including **bold**, *italic*, and [links](https://example.com).

### Code Blocks

\`\`\`python
def hello_world():
    print("Hello, world!")
\`\`\`

### Lists

- Bullet point one
- Bullet point two
- Bullet point three

1. Numbered item one
2. Numbered item two
\`\`\`

### 2. Frontmatter Fields

All fields are required unless marked optional:

- `title`: Article title (displays in cards and detail page)
- `excerpt`: Short description for preview cards
- `author`: Author name or organization
- `date`: Publication date in YYYY-MM-DD format
- `readTime`: Estimated reading time (e.g., "7 min")
- `category`: Category for filtering and badges
- `image`: Cover image path (relative to `/public/`)
- `tags`: Array of searchable tags (optional)

### 3. Add Images

Place article images in the `/public/` folder and reference them in frontmatter:

\`\`\`yaml
image: "/journalism-integrity.jpg"
\`\`\`

### 4. Auto-Discovery

The system automatically:
- Loads all `.mdx` files from `content/insights/`
- Displays them on the `/insights` page
- Makes them searchable in Command+K global search
- Generates static pages at `/insights/[slug]`
- Includes them in RSS feeds (`/api/rss`)
- Adds them to sitemap for SEO
- Makes them available to LLMs via `/llms-full`

### 5. File Naming

The filename becomes the URL slug:
- `my-article.mdx` → `/insights/my-article`
- `ai-ethics-2025.mdx` → `/insights/ai-ethics-2025`

Use kebab-case (lowercase with hyphens) for clean URLs.

## Key Pages

- `/` - Home with hero, stats, featured projects, FAQ
- `/products` - Product catalog with domain filtering
- `/products/[id]` - Product details with media viewer (video/slides/PDF)
- `/research` - Research papers with category filters
- `/research/[id]` - Paper details with abstract, citations, PDF
- `/insights` - MDX-powered blog articles list
- `/insights/[slug]` - Full article pages with syntax highlighting
- `/bootcamps` - Training programs with syllabi
- `/careers` - Job openings with department/type/location filters
- `/podcast` - Episodes with global audio player
- `/teams` - Team member profiles
- `/gallery` - Photo gallery with lightbox modal
- `/services` - Consulting and collaboration services
- `/contact` - Contact form with topic selection
- `/newsletter` - Newsletter subscription page

## Key Features

### Global Search (Command+K)

Press `⌘K` (Mac) or `Ctrl+K` (Windows) to open search:
- Search across products, research, insights, pages
- Popular suggestions when empty
- Keyboard navigation (↑↓ arrows, Enter to select)
- Category grouping with icons
- Auto-scroll to selected item

### Floating Audio Player

When playing a podcast episode:
- Player persists across all page navigation
- Shows episode title, guest, and playback controls
- Progress bar and time display
- Click to return to podcast page and scroll to episode
- Global state managed via React Context

### Product Detail Pages

Two-column responsive layout:
- Left: Product info, description, tech stack, features
- Right: Interactive media viewer with tabs
  - Video player for demos
  - Slide carousel for presentations
  - PDF modal for documentation
  - Auto-switches based on available media

### Gallery with Lightbox

Next.js Conf-inspired design:
- Masonry-style columns layout
- Click image to open fullscreen modal
- Navigation arrows (prev/next)
- Thumbnail carousel at bottom
- Keyboard navigation (arrows, Escape)
- Download button for hi-res images

## SEO & LLM Discoverability

The site is optimized for search engines and LLM crawlers:

### Sitemap (`/sitemap.xml`)
Auto-generated dynamic sitemap including:
- All static pages
- All research papers
- All insights articles (from MDX)
- All product pages
- All bootcamp programs

### Robots.txt (`/robots.txt`)
Configured to allow major LLM crawlers:
- GPTBot (OpenAI/ChatGPT)
- ChatGPT-User
- Google-Extended (Gemini)
- Claude-Web (Anthropic)
- PerplexityBot
- And standard search engines

### RSS Feeds
- `/api/rss` - Insights articles feed
- `/api/podcast-rss` - Podcast episodes feed

### LLM.txt (`/llms.txt`)
Structured text file with:
- Site overview and mission
- Directory structure
- Key pages and content
- Contact information

### Full Content API (`/llms-full`)
Comprehensive JSON endpoint with:
- All research papers (title, abstract, authors, keywords)
- All products (descriptions, tech stacks, features)
- All insights articles (summaries)
- All podcast episodes (topics, guests, timestamps)
- Bootcamp programs, services, team bios

### Structured Data (JSON-LD)
- Organization schema
- Article schema for insights
- Product schema for offerings
- Podcast episode schema

## Customization

### Design Tokens

Edit `/app/globals.css` to customize the color palette and design tokens:

\`\`\`css
@theme inline {
  --color-cream: #faf8f5;
  --color-coral: oklch(0.65 0.22 25);
  --color-emerald: oklch(0.60 0.18 150);
  --color-navy: oklch(0.25 0.08 250);
  /* ... other tokens ... */
}
\`\`\`

### Typography

The site uses Inter for all text. Change fonts in `/app/layout.tsx`:

\`\`\`tsx
import { Cute_Font as Your_Font } from 'next/font/google'

const yourFont = Your_Font({ subsets: ['latin'] })
\`\`\`

Then update `globals.css`:

\`\`\`css
@theme inline {
  --font-sans: 'Your Font', 'Your Font Fallback';
}
\`\`\`

## Deployment

Deploy to Vercel for optimal performance:

1. Push code to GitHub
2. Import project in Vercel
3. Deploy with zero configuration
4. (Optional) Add environment variables in Vercel dashboard

### Environment Variables

No environment variables required for basic functionality. Optional:

- `NEXT_PUBLIC_SITE_URL` - Your production URL for absolute paths in SEO

## Accessibility

- Semantic HTML throughout
- ARIA labels and roles on interactive elements
- Keyboard navigation support (Tab, Arrow keys, Enter, Escape)
- Focus states on all interactive elements
- WCAG AA color contrast ratios
- Screen reader-friendly content
- Skip navigation links

## Performance

- Server-side rendering for critical content
- Static generation for articles and pages
- Image optimization via Next.js `<Image>` component
- Lazy loading for images below the fold
- Code splitting for optimal bundle size
- Framer Motion animations optimized for 60fps

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - feel free to use for your own projects!

## Support

For questions or issues with this template, refer to the Next.js documentation at [nextjs.org/docs](https://nextjs.org/docs).
