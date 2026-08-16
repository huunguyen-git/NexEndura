# NexEndura — Development Plan

> **"Engineering Human Potential"**

Full-stack sports e-commerce platform built with **Next.js 15 (App Router)**, **Supabase**, **Tailwind CSS v4**, deployed on **Netlify**.

---

## Table of Contents

- [Brand Identity](#brand-identity)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Phase 1 — Core UI & Functionality](#phase-1--core-ui--functionality-screenshot-driven)
- [Phase 2 — Interactive Local Data & Routing](#phase-2--interactive-local-data--routing)
- [Phase 3 — Supabase Auth & Database](#phase-3--supabase-auth--database)
- [Phase 4 — Landing Page](#phase-4--landing-page)
- [Phase 5 — E2E Sweep, Security & Deployment](#phase-5--e2e-sweep-security--deployment)
- [Database Schema](#database-schema)
- [RLS Policy Matrix](#rls-policy-matrix)
- [File Structure](#file-structure)
- [Key Decisions Log](#key-decisions-log)

---

## Brand Identity

| Property | Value |
|----------|-------|
| **Name** | NexEndura |
| **Motto** | Engineering Human Potential |
| **Tone** | Premium, performance-driven, technically authoritative |
| **Target Sports (MVP)** | Football, Basketball, Running, Tennis, Gym & Fitness |
| **Design Language** | Will be extracted from client-provided screenshots |

---

## Technology Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| **Framework** | Next.js | 15+ (App Router) | Server Components, Server Actions, Middleware |
| **Language** | TypeScript | 5.x | Strict mode enabled |
| **Styling** | Tailwind CSS | v4 | CSS-first config (`@import "tailwindcss"`) |
| **Database** | Supabase (PostgreSQL) | Latest | RLS on all tables, Edge Functions |
| **Auth** | Supabase Auth | Via `@supabase/ssr` | Cookie-based, HTTP-only sessions |
| **State (Client)** | Zustand | Latest | Cart, filters, wishlist, kit builder |
| **Data Fetching** | @tanstack/react-query | Latest | Caching, optimistic updates (Phase 2+) |
| **Animations** | Framer Motion | Latest | Page transitions, micro-interactions |
| **Icons** | Lucide React | Latest | Consistent icon system |
| **3D Viewer** | `<model-viewer>` | Latest | Google web component, AR-ready, CSS rotation fallback |
| **Payments** | PayPal | Latest SDK | Integrated in Phase 3 |
| **Email/Notifications** | Resend | Latest | Restock alerts, pre-order notifications |
| **Deployment** | Netlify | OpenNext adapter | Auto SSR + Edge Functions |

---

## Architecture Overview

### Server-Side First

All sensitive logic runs server-side. The client browser receives pre-rendered HTML with minimal JS for interactivity.

```
┌─────────────────────────────────────────────────────────────────┐
│                        NETLIFY EDGE                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Next.js Middleware (Auth checks, session refresh)       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  NETLIFY SERVERLESS (Node.js)                            │   │
│  │  ┌────────────────────┐  ┌─────────────────────────┐     │   │
│  │  │  Server Components │  │  Server Actions          │     │   │
│  │  │  (Page rendering)  │  │  (Mutations: cart, orders,│    │   │
│  │  │                    │  │   admin CRUD)             │    │   │
│  │  └────────────────────┘  └─────────────────────────┘     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE CLOUD                             │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │  PostgreSQL     │  │  Edge Funcs   │  │  Auth              │  │
│  │  + RLS Policies │  │  (Webhooks,   │  │  (OAuth, sessions, │  │
│  │  (Data layer)   │  │   Strava,     │  │   role management) │  │
│  │                 │  │   Resend)     │  │                    │  │
│  └────────────────┘  └──────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
│  Pre-rendered HTML + Hydrated Client Components                 │
│  (Zustand stores, Framer Motion, <model-viewer>)                │
│  NO sensitive logic — all auth/payments/inventory server-side   │
└─────────────────────────────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Server Components by default** — pages and data fetching happen on the server
2. **Client Components only when needed** — interactivity (filters, cart, animations)
3. **Server Actions for all mutations** — cart updates, order placement, admin operations
4. **Supabase RLS as the last line of defense** — database rejects unauthorized queries regardless of app bugs
5. **Edge Middleware for auth** — sessions validated before any page renders
6. **Supabase Edge Functions for async work** — notifications, third-party API sync

---

## Phase 1 — Core UI & Functionality (Screenshot-Driven)

> **Prerequisite**: Client provides design screenshots. We extract the design language (colors, typography, spacing, component patterns) and apply it consistently across all pages.

### 1A. Project Scaffold

- Initialize Next.js 15 with TypeScript, App Router, ESLint
- Configure Tailwind CSS v4 (CSS-first, `@import "tailwindcss"`)
- Set up path aliases (`@/` → `src/`)
- Install core dependencies:
  - `lucide-react` — icons
  - `framer-motion` — animations
  - `zustand` — client state
  - `@tanstack/react-query` — data fetching prep
  - `@google/model-viewer` — 3D product viewer
- Google Fonts integration (chosen after screenshot review)
- Design tokens in `globals.css`: color palette, spacing, typography, shadows, radii

### 1B. Mock Data Layer (`src/data/`)

Create comprehensive mock data for all 5 target sports:

| File | Contents |
|------|----------|
| `products.ts` | 30+ products across Football, Basketball, Running, Tennis, Gym/Fitness with full specs, images, variants, features |
| `categories.ts` | Hierarchical taxonomy: Sport → Discipline → Gear Type → Sub-type |
| `users.ts` | Mock user profiles with size profiles, fitness data, order history |
| `orders.ts` | Sample orders in various statuses |
| `bundles.ts` | Pre-configured product bundles (e.g., "Home Gym Starter Pack") |
| `notifications.ts` | Sample restock/pre-order alerts |
| `synonyms.ts` | Search synonym map (e.g., "cleats" → "football boots") |

### 1C. Pages & Components

#### Global Layout

| Component | Description |
|-----------|-------------|
| `TopBar` | Promo banner (seasonal drops, free shipping thresholds) |
| `MainNav` | Mega-menu with "Shop by Sport" flyouts, search bar, user/cart icons |
| `SearchModal` | Full-screen predictive search: auto-suggest, auto-correct, synonym matching, recent/trending |
| `MobileNav` | Slide-out drawer navigation |
| `Footer` | Newsletter signup, sport category links, social, legal |

#### Shop / Category Pages (`/shop`, `/shop/[sport]`, `/shop/[sport]/[category]`)

| Component | Description |
|-----------|-------------|
| `BreadcrumbNav` | Hierarchical breadcrumbs reflecting taxonomy depth |
| `FilterSidebar` | Faceted filters: Sport, Brand, Skill Level, Surface Type, Weather Resistance, Price, Size, Color |
| `ActiveFilters` | Chip-style display with clear-all |
| `ProductGrid` | Responsive grid (2-4 cols) with animated card entry |
| `ProductCard` | Image, brand, name, price, rating, quick-add, color swatches, badges |
| `SortDropdown` | Relevance, Price, Rating, New Arrivals, Bestsellers |
| `Pagination` | Infinite scroll with "Load More" |

**Interactions**: Filter changes animate the grid. URL state sync for shareable filter URLs. Skeleton loading states.

#### Product Detail Page (`/product/[slug]`)

| Component | Description |
|-----------|-------------|
| `ProductGallery` | Main image + thumbnails, zoom-on-hover, `<model-viewer>` 3D viewer, video modules. Feature-click changes gallery focus. |
| `ProductInfo` | Brand, title, rating, price, color/size selectors, add-to-cart, wishlist |
| `TechSpecDrawer` | Expandable accordion for dense technical metrics (shoe drop, material, tension, gear ratios) |
| `FeatureHighlights` | Clickable feature list that cross-references gallery images |
| `SizeFitPredictor` | Modal wizard: height, weight, foot measurements, brand preference → size recommendation with confidence % |
| `ModelViewer3D` | `<model-viewer>` web component with AR button, CSS rotation fallback for products without 3D models |
| `ReviewSection` | Star ratings, review cards, "Verified Athlete" badges |
| `RelatedProducts` | Horizontal carousel |
| `RecentlyViewed` | localStorage-persisted strip |

#### Kit Builder (`/kit-builder`)

| Component | Description |
|-----------|-------------|
| `KitConfigurator` | Multi-step wizard: Select Sport → Choose Components (Jersey + Shorts + Socks) → Customize (Name, Number, Logo) → Review |
| `CustomizationPreview` | Live visual preview with name/number overlay |
| `PriceCompound` | Real-time running total |
| `LogoUploader` | Drag-and-drop with preview |
| `ComponentSelector` | Card grid for individual kit items |

#### Cart (`/cart`)

| Component | Description |
|-----------|-------------|
| `CartItemList` | Item cards with quantity stepper, variant display, remove, save-for-later |
| `CartSummary` | Subtotal, tax estimate, shipping, promo code, total |
| `B2BToggle` | Switch to bulk ordering mode — tiered pricing + PO number field |
| `BundleSuggestions` | "Complete the set" recommendations |
| `SavedItems` | Wishlist / saved-for-later |

#### Checkout (`/checkout`)

| Component | Description |
|-----------|-------------|
| `CheckoutStepper` | Multi-step: Shipping → Payment → Review → Confirmation |
| `AddressForm` | Address fields with validation |
| `PaymentForm` | PayPal integration placeholder (wired in Phase 3) |
| `OrderReview` | Final summary with all items, customizations, pricing |
| `B2BInvoicing` | Conditional: PO number, company details, NET-30 terms |

#### User Dashboard (`/account/*`)

| Component | Description |
|-----------|-------------|
| `DashboardLayout` | Side nav: Orders, Profile, Fitness, Wishlist, Notifications, Settings |
| `OrderHistory` | Order cards with status badges, tracking, reorder |
| `FitnessIntegration` | Strava connection UI, milestone badges, loyalty points (designed for scalability, wired later) |
| `NotificationCenter` | Restock/pre-order/price-drop alerts with toggle preferences |
| `ProfileEditor` | Personal info, size preferences, sport interests |

#### Admin Dashboard (`/admin/*`)

| Component | Description |
|-----------|-------------|
| `AdminLayout` | Sidebar: Products, Orders, Inventory, Bundles, Users, Analytics |
| `ProductManager` | CRUD table with inline editing, bulk actions, image upload |
| `InventoryMatrix` | Serialized stock view: every variant (size × color × hand) with stock counts |
| `BundleBuilder` | Create bundles with auto-deduction rules |
| `OrderManager` | Order list with status workflow |
| `AnalyticsDashboard` | Revenue charts, top products, stock alerts |
| `OmnichannelSync` | Warehouse/POS sync status (UI scaffold) |

---

## Phase 2 — Interactive Local Data & Routing

> **Goal**: Wire all UI to local state. Every click, filter, add-to-cart, and navigation works with mock data.

### Zustand Stores (`src/stores/`)

| Store | Responsibilities |
|-------|-----------------|
| `useCartStore` | Cart items, quantities, customizations, B2B mode, promo codes |
| `useFilterStore` | Active filters, sort order, search query — synced to URL params |
| `useUserStore` | Mock user profile, preferences, fitness data |
| `useWishlistStore` | Saved items (localStorage persistence) |
| `useNotificationStore` | Restock/pre-order subscriptions |
| `useKitBuilderStore` | Kit configuration state across wizard steps |

### Route Map

```
/                           → Landing page (Phase 4)
/shop                       → All products
/shop/[sport]               → Sport category (football, basketball, etc.)
/shop/[sport]/[category]    → Sub-category (footwear, apparel, equipment)
/product/[slug]             → Product detail page
/kit-builder                → Kit builder / team customizer
/cart                       → Shopping cart
/checkout                   → Checkout flow
/account                    → User dashboard home
/account/orders             → Order history
/account/fitness            → Fitness tracker integration
/account/notifications      → Notification preferences
/account/profile            → Profile & size preferences
/admin                      → Admin dashboard home
/admin/products             → Product management
/admin/inventory            → Inventory matrix
/admin/bundles              → Bundle builder
/admin/orders               → Order management
/admin/analytics            → Analytics dashboard
/login                      → Sign in (Phase 3)
/register                   → Sign up (Phase 3)
/forgot-password            → Password reset (Phase 3)
```

### Key Interactions to Wire

| Feature | Implementation |
|---------|---------------|
| **Predictive Search** | Fuzzy match against product data, debounced input, synonym map, recent/trending |
| **Faceted Filters** | Multi-select with AND/OR logic, URL state sync, animated grid transitions |
| **Cart Operations** | Add/remove/update with optimistic UI, quantity limits from stock |
| **Kit Builder** | Multi-step wizard with step validation, live price computation |
| **Size Predictor** | Algorithm: height + weight + brand lookup table → size with confidence % |
| **B2B Toggle** | Switch cart to bulk mode, apply tiered pricing calculation |
| **Admin CRUD** | Full create/read/update/delete against local stores |
| **Bundle Deduction** | Adding a bundle decrements individual component stock counts |
| **Feature Highlighting** | Clicking a product feature scrolls/changes gallery to matching image |
| **3D Viewer** | `<model-viewer>` loads .glb file, CSS rotation fallback |
| **Recently Viewed** | localStorage tracking, displayed on PDP |

---

## Phase 3 — Supabase Auth & Database

> **Goal**: Replace mock data with real Supabase backend. Implement auth, RLS, server actions.

### Auth Configuration

- `@supabase/supabase-js` + `@supabase/ssr` (cookie-based, HTTP-only sessions)
- Client utilities:
  - `src/lib/supabase/client.ts` — browser client
  - `src/lib/supabase/server.ts` — server components, server actions
  - `src/lib/supabase/middleware.ts` — session refresh helper
- `middleware.ts` at project root — auth enforcement
- Auth pages: `/login`, `/register`, `/forgot-password`
- OAuth providers: Google (configurable)
- Roles: `customer`, `club_admin`, `admin`

### PayPal Integration

- PayPal JS SDK loaded in checkout
- Server Action creates PayPal order, captures payment
- Order confirmed in Supabase only after successful capture
- Webhook endpoint for PayPal IPN notifications

### Resend Integration

- Supabase Edge Function `restock-notifier`:
  - Triggered by database webhook when `product_variants.stock_count` changes
  - Queries `notifications` table for subscribers
  - Sends email via Resend API
- Transactional emails: order confirmation, shipping updates, password reset

### Strava Integration (Scalability-Ready)

- Database schema includes `strava_token` and `fitness_data` on user profiles
- UI for connection is built but OAuth flow is stubbed
- Supabase Edge Function `strava-sync` scaffold ready for activation
- Loyalty points system designed in schema — can be activated without schema changes

---

## Database Schema

### Tables

#### `categories`
```sql
CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    parent_id   UUID REFERENCES categories(id) ON DELETE CASCADE,
    sport       TEXT,                    -- top-level sport tag
    icon        TEXT,                    -- lucide icon name
    description TEXT,
    image_url   TEXT,
    level       INTEGER DEFAULT 0,      -- depth in tree
    sort_order  INTEGER DEFAULT 0,
    created_at  TIMESTAMPTZ DEFAULT now()
);
```

#### `products`
```sql
CREATE TABLE products (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    brand           TEXT NOT NULL,
    description     TEXT,
    price           NUMERIC(10,2) NOT NULL,
    compare_price   NUMERIC(10,2),       -- strikethrough price
    category_id     UUID REFERENCES categories(id),
    images          JSONB DEFAULT '[]',  -- [{url, alt, feature_tag}]
    model_url       TEXT,                -- .glb file for <model-viewer>
    video_url       TEXT,                -- product video
    specs           JSONB DEFAULT '{}',  -- {shoe_drop: "8mm", weight: "280g", ...}
    features        JSONB DEFAULT '[]',  -- [{name, description, image_index}]
    skill_level     TEXT,                -- Beginner, Intermediate, Pro
    surface_type    TEXT[],              -- {Firm Ground, Turf, Indoor}
    weather_rating  TEXT[],              -- {Waterproof, Windproof}
    is_customizable BOOLEAN DEFAULT false,
    status          TEXT DEFAULT 'active', -- active, draft, archived
    rating_avg      NUMERIC(2,1) DEFAULT 0,
    rating_count    INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);
```

#### `product_variants`
```sql
CREATE TABLE product_variants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID REFERENCES products(id) ON DELETE CASCADE,
    sku             TEXT NOT NULL UNIQUE,
    size            TEXT,
    color           TEXT,
    color_hex       TEXT,                -- for UI swatch
    hand            TEXT,                -- Left, Right, Universal
    grip_size       TEXT,
    weight          TEXT,                -- e.g., bat weight
    stock_count     INTEGER DEFAULT 0,
    reserved_count  INTEGER DEFAULT 0,   -- held during checkout
    barcode         TEXT,
    price_override  NUMERIC(10,2),       -- variant-level price if different
    created_at      TIMESTAMPTZ DEFAULT now()
);
```

#### `product_bundles`
```sql
CREATE TABLE product_bundles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    slug            TEXT NOT NULL UNIQUE,
    description     TEXT,
    image_url       TEXT,
    discount_type   TEXT DEFAULT 'percentage', -- percentage or fixed
    discount_value  NUMERIC(10,2),
    items           JSONB NOT NULL,       -- [{product_id, variant_id, quantity}]
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMPTZ DEFAULT now()
);
```

#### `users` (extends Supabase auth.users)
```sql
CREATE TABLE public.users (
    id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email           TEXT NOT NULL,
    full_name       TEXT,
    role            TEXT DEFAULT 'customer', -- customer, club_admin, admin
    avatar_url      TEXT,
    phone           TEXT,
    size_profile    JSONB DEFAULT '{}',  -- {shoe_size, shirt_size, height, weight, ...}
    sport_interests TEXT[] DEFAULT '{}',
    fitness_data    JSONB DEFAULT '{}',  -- milestone tracking
    strava_token    TEXT,                -- encrypted OAuth token
    loyalty_points  INTEGER DEFAULT 0,
    company_name    TEXT,                -- for B2B users
    company_tax_id  TEXT,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);
```

#### `cart_items`
```sql
CREATE TABLE cart_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
    variant_id      UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity        INTEGER NOT NULL DEFAULT 1,
    customization   JSONB DEFAULT '{}',  -- {name, number, logo_url}
    added_at        TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, variant_id, customization)
);
```

#### `wishlists`
```sql
CREATE TABLE wishlists (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id      UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, product_id)
);
```

#### `orders`
```sql
CREATE TABLE orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES public.users(id),
    order_number    TEXT NOT NULL UNIQUE, -- human-readable NE-2024-XXXXX
    status          TEXT DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
    subtotal        NUMERIC(10,2) NOT NULL,
    tax             NUMERIC(10,2) DEFAULT 0,
    shipping_cost   NUMERIC(10,2) DEFAULT 0,
    discount        NUMERIC(10,2) DEFAULT 0,
    total           NUMERIC(10,2) NOT NULL,
    is_b2b          BOOLEAN DEFAULT false,
    po_number       TEXT,                -- for B2B purchase orders
    company_name    TEXT,
    shipping_address JSONB NOT NULL,
    billing_address  JSONB,
    payment_method  TEXT,                -- paypal
    payment_id      TEXT,                -- PayPal transaction ID
    tracking_number TEXT,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);
```

#### `order_items`
```sql
CREATE TABLE order_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID REFERENCES orders(id) ON DELETE CASCADE,
    variant_id      UUID REFERENCES product_variants(id),
    product_name    TEXT NOT NULL,        -- snapshot at time of order
    variant_label   TEXT,                 -- "Size 10 / Black / Right Hand"
    quantity        INTEGER NOT NULL,
    unit_price      NUMERIC(10,2) NOT NULL,
    customization   JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT now()
);
```

#### `notifications`
```sql
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id      UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id      UUID REFERENCES product_variants(id),
    type            TEXT NOT NULL,        -- restock, preorder, price_drop, seasonal_drop
    channel         TEXT DEFAULT 'email', -- email, sms
    is_active       BOOLEAN DEFAULT true,
    triggered_at    TIMESTAMPTZ,          -- last time notification was sent
    created_at      TIMESTAMPTZ DEFAULT now()
);
```

#### `reviews`
```sql
CREATE TABLE reviews (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
    rating          INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title           TEXT,
    body            TEXT,
    is_verified     BOOLEAN DEFAULT false, -- verified purchase
    is_athlete      BOOLEAN DEFAULT false, -- verified athlete badge
    created_at      TIMESTAMPTZ DEFAULT now(),
    UNIQUE(product_id, user_id)
);
```

#### `search_synonyms`
```sql
CREATE TABLE search_synonyms (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term            TEXT NOT NULL,
    synonym         TEXT NOT NULL,
    UNIQUE(term, synonym)
);
```

### Database Functions

```sql
-- Recursive CTE to fetch full category tree
CREATE FUNCTION get_category_tree(root_id UUID DEFAULT NULL)
RETURNS TABLE (id UUID, name TEXT, slug TEXT, parent_id UUID, level INTEGER)
AS $$ ... $$ LANGUAGE sql;

-- Full-text search with synonym expansion
CREATE FUNCTION search_products(query TEXT, filters JSONB DEFAULT '{}')
RETURNS SETOF products
AS $$ ... $$ LANGUAGE plpgsql;

-- Stock reservation during checkout
CREATE FUNCTION reserve_stock(variant_id UUID, qty INTEGER)
RETURNS BOOLEAN
AS $$ ... $$ LANGUAGE plpgsql;

-- Bundle stock availability check
CREATE FUNCTION check_bundle_availability(bundle_id UUID)
RETURNS BOOLEAN
AS $$ ... $$ LANGUAGE plpgsql;

-- Generate order number
CREATE FUNCTION generate_order_number()
RETURNS TEXT
AS $$ ... $$ LANGUAGE plpgsql;
```

### Database Triggers

```sql
-- Auto-update product rating when review is inserted/updated/deleted
CREATE TRIGGER update_product_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION recalculate_product_rating();

-- Auto-create user profile on auth signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Notify on restock (fires Supabase Edge Function)
CREATE TRIGGER on_stock_change
AFTER UPDATE OF stock_count ON product_variants
FOR EACH ROW
WHEN (OLD.stock_count = 0 AND NEW.stock_count > 0)
EXECUTE FUNCTION notify_restock();
```

---

## RLS Policy Matrix

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| `categories` | ✅ Public | 🔒 Admin | 🔒 Admin | 🔒 Admin |
| `products` | ✅ Public (where status='active') | 🔒 Admin | 🔒 Admin | 🔒 Admin |
| `product_variants` | ✅ Public | 🔒 Admin | 🔒 Admin | 🔒 Admin |
| `product_bundles` | ✅ Public (where is_active) | 🔒 Admin | 🔒 Admin | 🔒 Admin |
| `users` | 🔑 Own row / Admin | 🔧 Trigger only | 🔑 Own row / Admin | 🔒 Admin |
| `cart_items` | 🔑 Own user | 🔑 Auth'd (own) | 🔑 Own user | 🔑 Own user |
| `wishlists` | 🔑 Own user | 🔑 Auth'd (own) | 🔑 Own user | 🔑 Own user |
| `orders` | 🔑 Own user / Admin | 🔑 Auth'd | 🔑 Own / Admin | 🔒 Admin |
| `order_items` | 🔑 Own order / Admin | 🔑 Auth'd | 🔒 Admin | 🔒 Admin |
| `notifications` | 🔑 Own user | 🔑 Auth'd (own) | 🔑 Own user | 🔑 Own user |
| `reviews` | ✅ Public | 🔑 Auth'd (own) | 🔑 Own user | 🔑 Own user / Admin |
| `search_synonyms` | ✅ Public | 🔒 Admin | 🔒 Admin | 🔒 Admin |

**Legend**: ✅ Public = no auth needed | 🔑 = requires auth + ownership check | 🔒 = admin role only | 🔧 = system trigger only

---

## Server Actions (`src/app/actions/`)

| File | Actions |
|------|---------|
| `products.ts` | `getProducts`, `getProductBySlug`, `searchProducts`, `getCategories`, `getCategoryTree` |
| `cart.ts` | `getCart`, `addToCart`, `updateCartItem`, `removeFromCart`, `clearCart` |
| `orders.ts` | `createOrder`, `getOrders`, `getOrderById`, `updateOrderStatus` |
| `auth.ts` | `signIn`, `signUp`, `signOut`, `resetPassword`, `updateProfile` |
| `wishlist.ts` | `getWishlist`, `addToWishlist`, `removeFromWishlist` |
| `notifications.ts` | `subscribe`, `unsubscribe`, `getSubscriptions` |
| `reviews.ts` | `createReview`, `getProductReviews` |
| `admin/products.ts` | `createProduct`, `updateProduct`, `deleteProduct`, `uploadImage` |
| `admin/inventory.ts` | `updateStock`, `getInventoryMatrix`, `reserveStock`, `releaseStock` |
| `admin/bundles.ts` | `createBundle`, `updateBundle`, `deleteBundle`, `checkAvailability` |
| `admin/orders.ts` | `getAllOrders`, `updateStatus`, `generateInvoice` |
| `admin/analytics.ts` | `getRevenueSummary`, `getTopProducts`, `getStockAlerts` |

---

## Supabase Edge Functions

| Function | Trigger | Action |
|----------|---------|--------|
| `restock-notifier` | Database webhook on `product_variants.stock_count` change | Query subscribers → Send email via Resend |
| `strava-sync` | HTTP (OAuth callback) | Exchange code → Store token → Sync milestones → Award loyalty points |
| `order-confirmation` | Database webhook on `orders` INSERT | Send confirmation email via Resend |
| `bundle-stock-sync` | Database webhook on `product_variants` UPDATE | Recalculate bundle availability |

---

## Phase 4 — Landing Page

> **Goal**: Conversion-optimized landing page that establishes the NexEndura brand.

### Sections

| Section | Description |
|---------|-------------|
| `Hero` | Full-bleed video/image hero, animated headline, sport-switching carousel, primary CTA |
| `SportCategories` | Visual grid of 5 sport categories with hover effects |
| `FeaturedProducts` | Curated carousel with "Staff Pick" / "Trending" badges |
| `SeasonalDrop` | Countdown timer for upcoming drops with pre-order CTA |
| `KitBuilderPromo` | Interactive teaser for the kit builder |
| `BrandStory` | Lifestyle imagery, "Engineering Human Potential" messaging, athlete testimonials |
| `CommunityStats` | Animated counters: athletes served, sports covered, products |
| `Newsletter` | Email capture with sport preference selection |
| `TrustSignals` | Payment methods, shipping info, return policy |

### SEO

- `<title>`: "NexEndura — Engineering Human Potential | Premium Sports Equipment"
- `<meta description>` per page
- Semantic HTML5 (`main`, `article`, `section`, `nav`)
- Single `<h1>` per page, proper heading hierarchy
- `next/image` for all images with `alt` tags
- Dynamic `sitemap.xml` generation
- Open Graph + Twitter Card meta tags

---

## Phase 5 — E2E Sweep, Security & Deployment

### Security Checklist

- [ ] Middleware protects `/account/*` routes (require auth)
- [ ] Middleware protects `/admin/*` routes (require auth + admin role)
- [ ] All Server Actions validate auth + authorization before executing
- [ ] RLS enabled on every Supabase table
- [ ] CSRF protection via Next.js Server Action tokens
- [ ] Rate limiting on auth endpoints
- [ ] Input sanitization on all user inputs (XSS prevention)
- [ ] File upload validation (type whitelist, max size) for logo uploads
- [ ] Environment variables: only `NEXT_PUBLIC_*` exposed to client
- [ ] HTTP-only cookies for sessions (via `@supabase/ssr`)
- [ ] Content Security Policy headers in `next.config.ts`
- [ ] PayPal webhook signature verification
- [ ] SQL injection prevention (parameterized queries via Supabase client)

### Testing

| Type | Tool | Scope |
|------|------|-------|
| Component | Vitest + React Testing Library | All interactive components |
| E2E | Playwright | Full user flows: browse → filter → cart → checkout |
| Auth | Playwright | Sign up, sign in, protected routes, role enforcement |
| API | Vitest | Server Actions, edge functions |
| Visual | Browser screenshots | Cross-browser validation |
| Performance | Lighthouse | LCP < 2.5s, CLS < 0.1, FID < 100ms |

### Netlify Deployment

1. Connect GitHub repository to Netlify
2. Build command: `next build` (OpenNext adapter auto-configured)
3. Environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
   - `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`
   - `RESEND_API_KEY`
4. Custom domain + SSL
5. Post-deploy smoke tests via Playwright

### Production Verification

- [ ] All routes render (SSR + client navigation)
- [ ] Auth flow: register → verify → login → protected pages
- [ ] Cart persistence across sessions (Supabase-backed)
- [ ] Search with synonym matching returns correct results
- [ ] Filters narrow results correctly, URL state preserved
- [ ] Kit Builder produces valid configurations with correct pricing
- [ ] B2B toggle shows tiered pricing + PO number field
- [ ] Admin CRUD: products, inventory, bundles, orders
- [ ] Restock notifications trigger on stock change
- [ ] Mobile responsive across all breakpoints (320px - 1440px+)
- [ ] Lighthouse score ≥ 90 on all core pages
- [ ] No console errors in production
- [ ] PayPal payments process correctly (sandbox → live)

---

## File Structure

```
full-stack-shopping-website/
├── public/
│   ├── images/                         # Static images, product photos
│   ├── models/                         # .glb files for <model-viewer>
│   └── fonts/                          # Self-hosted fonts (if needed)
├── src/
│   ├── app/
│   │   ├── (shop)/                     # Public shop layout group
│   │   │   ├── layout.tsx              # Nav + Footer
│   │   │   ├── page.tsx                # Landing page (Phase 4)
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx            # All products
│   │   │   │   └── [sport]/
│   │   │   │       ├── page.tsx        # Sport category
│   │   │   │       └── [category]/
│   │   │   │           └── page.tsx    # Sub-category
│   │   │   ├── product/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx        # Product detail page
│   │   │   ├── kit-builder/
│   │   │   │   └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   └── checkout/
│   │   │       └── page.tsx
│   │   ├── (auth)/                     # Auth layout group
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   ├── (dashboard)/                # Protected layout group
│   │   │   ├── account/
│   │   │   │   ├── layout.tsx          # Dashboard sidebar layout
│   │   │   │   ├── page.tsx            # Dashboard home
│   │   │   │   ├── orders/page.tsx
│   │   │   │   ├── fitness/page.tsx
│   │   │   │   ├── notifications/page.tsx
│   │   │   │   └── profile/page.tsx
│   │   │   └── admin/
│   │   │       ├── layout.tsx          # Admin sidebar layout
│   │   │       ├── page.tsx            # Admin home
│   │   │       ├── products/page.tsx
│   │   │       ├── inventory/page.tsx
│   │   │       ├── bundles/page.tsx
│   │   │       ├── orders/page.tsx
│   │   │       └── analytics/page.tsx
│   │   ├── actions/                    # Server Actions
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   ├── auth.ts
│   │   │   ├── wishlist.ts
│   │   │   ├── notifications.ts
│   │   │   ├── reviews.ts
│   │   │   └── admin/
│   │   │       ├── products.ts
│   │   │       ├── inventory.ts
│   │   │       ├── bundles.ts
│   │   │       ├── orders.ts
│   │   │       └── analytics.ts
│   │   ├── api/                        # API routes
│   │   │   └── webhooks/
│   │   │       ├── paypal/route.ts
│   │   │       └── restock/route.ts
│   │   ├── globals.css                 # Design tokens + Tailwind v4
│   │   └── layout.tsx                  # Root layout (fonts, metadata)
│   ├── components/
│   │   ├── ui/                         # Primitives: Button, Input, Modal, Badge, etc.
│   │   ├── layout/                     # TopBar, MainNav, Footer, MobileNav
│   │   ├── shop/                       # FilterSidebar, ProductGrid, ProductCard, etc.
│   │   ├── product/                    # Gallery, TechSpecs, SizePredictor, ModelViewer, etc.
│   │   ├── cart/                       # CartItemList, CartSummary, B2BToggle, etc.
│   │   ├── checkout/                   # Stepper, AddressForm, PaymentForm, etc.
│   │   ├── kit-builder/                # Configurator, Preview, ComponentSelector, etc.
│   │   ├── account/                    # OrderHistory, FitnessIntegration, etc.
│   │   ├── admin/                      # ProductManager, InventoryMatrix, BundleBuilder, etc.
│   │   ├── landing/                    # Hero, SportCategories, FeaturedProducts, etc.
│   │   └── search/                     # SearchModal, SearchResults, etc.
│   ├── data/                           # Mock data (Phases 1-2)
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── users.ts
│   │   ├── orders.ts
│   │   ├── bundles.ts
│   │   ├── notifications.ts
│   │   └── synonyms.ts
│   ├── lib/
│   │   ├── supabase/                   # Supabase clients (Phase 3)
│   │   │   ├── client.ts              # Browser client
│   │   │   ├── server.ts             # Server client
│   │   │   └── middleware.ts          # Session refresh
│   │   ├── utils.ts                    # General utilities
│   │   ├── search.ts                   # Search engine with synonym expansion
│   │   ├── size-predictor.ts           # Size recommendation algorithm
│   │   └── pricing.ts                  # Tiered pricing, bundle discounts
│   ├── stores/                         # Zustand stores
│   │   ├── cart-store.ts
│   │   ├── filter-store.ts
│   │   ├── user-store.ts
│   │   ├── wishlist-store.ts
│   │   ├── notification-store.ts
│   │   └── kit-builder-store.ts
│   └── types/                          # TypeScript interfaces
│       ├── product.ts
│       ├── user.ts
│       ├── order.ts
│       ├── cart.ts
│       └── filters.ts
├── supabase/                           # Supabase project (Phase 3)
│   ├── migrations/
│   │   ├── 001_create_categories.sql
│   │   ├── 002_create_products.sql
│   │   ├── 003_create_variants.sql
│   │   ├── 004_create_users.sql
│   │   ├── 005_create_cart.sql
│   │   ├── 006_create_orders.sql
│   │   ├── 007_create_notifications.sql
│   │   ├── 008_create_reviews.sql
│   │   ├── 009_create_bundles.sql
│   │   ├── 010_create_synonyms.sql
│   │   ├── 011_create_functions.sql
│   │   ├── 012_create_triggers.sql
│   │   └── 013_create_rls_policies.sql
│   ├── seed.sql                        # Initial data seeding
│   └── functions/                      # Edge Functions
│       ├── restock-notifier/
│       ├── order-confirmation/
│       ├── strava-sync/
│       └── bundle-stock-sync/
├── tests/
│   ├── e2e/                            # Playwright E2E tests
│   ├── components/                     # Vitest component tests
│   └── actions/                        # Vitest server action tests
├── .env.local                          # Local environment variables
├── .env.example                        # Template for env vars
├── middleware.ts                        # Next.js middleware (auth)
├── next.config.ts
├── postcss.config.mjs
├── package.json
├── tsconfig.json
└── DEVELOPMENT-PLAN.md                 # This file
```

---

## Key Decisions Log

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | Next.js 15 App Router | Server Components + Server Actions = server-first architecture | 2026-08-05 |
| 2 | Tailwind CSS v4 | Latest, CSS-first config — cleaner, more performant | 2026-08-05 |
| 3 | Supabase (PostgreSQL) | Auth + DB + Edge Functions + RLS in one platform | 2026-08-05 |
| 4 | `<model-viewer>` for 3D | Lightweight, Google-maintained, AR-ready, CSS rotation fallback | 2026-08-05 |
| 5 | PayPal for payments | Client preference | 2026-08-05 |
| 6 | Resend for email | Clean API, good deliverability, transactional email focus | 2026-08-05 |
| 7 | Strava = scalability-ready | Schema designed for it, UI scaffolded, OAuth stubbed — not MVP blocker | 2026-08-05 |
| 8 | Server-side architecture | All sensitive logic in Server Components/Actions, never client-side | 2026-08-05 |
| 9 | Zustand for client state | Lightweight, no boilerplate, perfect for cart/filters/UI state | 2026-08-05 |
| 10 | Netlify deployment | OpenNext adapter, auto SSR + Edge, good DX | 2026-08-05 |
| 11 | 5 MVP sports | Football, Basketball, Running, Tennis, Gym & Fitness — expandable | 2026-08-05 |

---

## Next Steps

1. **Client provides design screenshots** → We extract design language
2. **Phase 1 begins** → Scaffold + Design System + All pages & components
3. Iterate on design with client feedback
4. Proceed through Phases 2-5 sequentially

---

## Phase 6 — Future Prospects

The following features have been discussed and slated for post-MVP development:

### 1. Fitness Gamification & Strava Integration
A dedicated system to reward users for their active lifestyle by syncing external fitness data (like Strava):
- **Milestone Badges**: Users unlock badges (e.g., "Marathon Finisher", "Iron Lungs") by hitting specific workout thresholds.
- **Loyalty Points**: Badges and milestones translate into loyalty points, which can be redeemed for discounts at checkout.
- **UI Extension**: Will require a new `/account/fitness` dashboard to manage the integration and view earned badges.

*Last updated: 2026-08-06*
