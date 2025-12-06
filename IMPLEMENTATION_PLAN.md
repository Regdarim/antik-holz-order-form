# ANTIK-HOLZ Multi-Product CMS Implementation Plan

## Overview

This document outlines the complete restructuring of the ANTIK-HOLZ order form application to support multiple products with a CMS backend and two separate views (customer and admin).

## Goals

1. **Add CMS Integration**: Enable easy editing of forms and adding new products (beams, wall panels, furniture boards, floor boards, etc.)
2. **Two Separate Views**:
   - Customer view (public order forms)
   - Admin view (order management, catalog editing)
3. **Maintain Design Consistency**: Follow CLAUDE.md specifications across all new components
4. **Easy Expansion**: Architecture that supports adding new product types without code changes
5. **No Payment Integration**: Orders collected via form submission only (for now)

## Technology Stack

- **CMS**: Strapi 4.x (headless CMS for product catalog)
- **Database**: PostgreSQL (structured data with JSONB support)
- **Frontend State**: TanStack Query (React Query) for data fetching/caching
- **Form Management**: React Hook Form + Zod for validation
- **Routing**: React Router DOM for customer/admin views
- **Styling**: TailwindCSS 3.x (current implementation)
- **Authentication**: Simple password auth (localStorage) → migrate to Strapi auth later

## Project Structure

```
antik-holz-order-form/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── FormField.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Section.jsx
│   │   ├── product/
│   │   │   ├── ColorSwatch.jsx
│   │   │   ├── PricingCard.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── SpecRow.jsx
│   │   │   └── FAQItem.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       ├── Hero.jsx
│   │       ├── Footer.jsx
│   │       └── AdminLayout.jsx
│   ├── features/
│   │   ├── customer/
│   │   │   ├── order-form/
│   │   │   ├── catalog/
│   │   │   └── faq/
│   │   └── admin/
│   │       ├── orders/
│   │       ├── catalog/
│   │       └── dashboard/
│   ├── hooks/
│   │   ├── useOrderForm.js
│   │   ├── usePriceCalculation.js
│   │   └── useOrders.js
│   ├── lib/
│   │   ├── api/
│   │   │   └── strapi.js
│   │   ├── validation/
│   │   │   └── orderSchema.js
│   │   └── utils/
│   │       ├── pricing.js
│   │       └── orderSummary.js
│   ├── config/
│   │   ├── theme.js
│   │   └── constants.js
│   └── pages/
│       ├── customer/
│       │   ├── StareDescki.jsx
│       │   ├── Belki.jsx
│       │   └── PaneleScienne.jsx
│       └── admin/
│           ├── Login.jsx
│           ├── Dashboard.jsx
│           ├── Orders.jsx
│           └── Catalog.jsx
├── strapi-backend/
│   └── src/api/
│       ├── product/
│       ├── product-color/
│       ├── package-option/
│       ├── extra-option/
│       └── order/
└── IMPLEMENTATION_PLAN.md (this file)
```

## Routing Structure

### Customer Routes (Public)
- `/` - Home/Landing page
- `/stare-deski` - Old boards order form (current functionality)
- `/belki` - Beams order form
- `/panele-scienne` - Wall panels order form
- `/plyty-meblowe` - Furniture boards order form (future)
- `/deski-podlogowe` - Floor boards order form (future)

### Admin Routes (Protected)
- `/admin/login` - Admin login
- `/admin/dashboard` - Overview stats
- `/admin/orders` - Order management (list, detail, status updates)
- `/admin/catalog` - Product catalog editing (CRUD for products, colors, packages)

## Strapi Content Types

### Product
```javascript
{
  "singularName": "product",
  "pluralName": "products",
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "name" },
    "category": { "type": "enumeration", "enum": ["boards", "beams", "wall-panels", "furniture", "flooring"] },
    "description": { "type": "richtext" },
    "basePrice": { "type": "decimal", "required": true },
    "unit": { "type": "string", "default": "m²" },
    "colors": { "relation": "oneToMany", "target": "api::product-color.product-color" },
    "packages": { "relation": "oneToMany", "target": "api::package-option.package-option" },
    "extraOptions": { "relation": "oneToMany", "target": "api::extra-option.extra-option" },
    "specifications": { "type": "json" },
    "faq": { "type": "json" },
    "isActive": { "type": "boolean", "default": true }
  }
}
```

### Order
```javascript
{
  "singularName": "order",
  "pluralName": "orders",
  "attributes": {
    "orderNumber": { "type": "string", "unique": true },
    "status": { "type": "enumeration", "enum": ["new", "quoted", "confirmed", "in_production", "shipped", "completed", "cancelled"] },
    "customerEmail": { "type": "email", "required": true },
    "customerPhone": { "type": "string", "required": true },
    "customerAddress": { "type": "text", "required": true },
    "product": { "relation": "manyToOne", "target": "api::product.product" },
    "selectedColor": { "relation": "manyToOne", "target": "api::product-color.product-color" },
    "selectedPackage": { "relation": "manyToOne", "target": "api::package-option.package-option" },
    "extraOptions": { "relation": "manyToMany", "target": "api::extra-option.extra-option" },
    "sqm": { "type": "decimal", "required": true },
    "pricePerSqm": { "type": "decimal" },
    "packagePrice": { "type": "decimal" },
    "extraOptionsTotal": { "type": "decimal" },
    "grandTotal": { "type": "decimal" },
    "customerNotes": { "type": "text" },
    "adminNotes": { "type": "text" }
  }
}
```

## Implementation Phases

### Phase 1: Component Extraction (Week 1)
**Goal**: Break monolithic 1356-line component into reusable pieces

1. Extract `src/config/theme.js` with design system constants
2. Create UI components: Button, Card, FormField, Section, Badge
3. Create product components: ColorSwatch, PricingCard, FeatureCard
4. Create layout components: Header, Hero, Footer
5. Update `AntikHolzOrderForm.jsx` to use extracted components
6. **Test**: Verify form works identically after each extraction

### Phase 2: Business Logic Extraction (Week 1)
**Goal**: Separate logic from presentation

1. Create `hooks/useOrderForm.js` - Form state management
2. Create `hooks/usePriceCalculation.js` - Price calculation logic
3. Create `lib/utils/pricing.js` - Pricing helpers
4. Create `lib/utils/orderSummary.js` - Order summary generation
5. Create `lib/validation/orderSchema.js` - Zod validation schema
6. **Test**: All calculations match original implementation

### Phase 3: Data Layer Preparation (Week 2)
**Goal**: Move hardcoded data to JSON files

1. Create `src/data/products/stare-deski.json`
2. Create `src/data/colors/stare-deski-colors.json`
3. Create `src/data/packages/stare-deski-packages.json`
4. Update component to load from JSON files
5. **Test**: Data loading works, form unchanged

### Phase 4: Strapi Backend Setup (Week 2-3)
**Goal**: Create CMS backend for product management

1. Install Strapi: `npx create-strapi-app@latest strapi-backend`
2. Configure PostgreSQL database
3. Create content types: Product, ProductColor, PackageOption, ExtraOption, Order
4. Set up API permissions
5. Create admin user
6. Migrate JSON data to Strapi
7. **Test**: API endpoints return correct data

### Phase 5: Frontend CMS Integration (Week 3)
**Goal**: Connect frontend to Strapi

1. Install dependencies: `react-query`, `axios`
2. Create `lib/api/strapi.js` - API client
3. Create `hooks/useProducts.js` - Product data fetching
4. Update order form to use CMS data with fallback
5. **Test**: Form loads data from Strapi, falls back to JSON if unavailable

### Phase 6: Multi-Product Support (Week 4)
**Goal**: Generic product configurator

1. Create `features/customer/order-form/ProductConfigurator.jsx`
2. Create product-specific pages: Belki.jsx, PaneleScienne.jsx
3. Install React Router: `react-router-dom`
4. Set up routing configuration
5. Update `App.jsx` with routes
6. **Test**: Can navigate between different product forms

### Phase 7: Admin Panel (Week 4-5)
**Goal**: Build order management interface

1. Create `pages/admin/Login.jsx` - Simple password auth
2. Create `pages/admin/Dashboard.jsx` - Stats overview
3. Create `pages/admin/Orders.jsx` - Order list with filters
4. Create `features/admin/orders/OrderDetail.jsx` - Order detail modal
5. Create `features/admin/orders/StatusBadge.jsx` - Status indicator
6. Create protected route wrapper
7. **Test**: Admin can view and manage orders

### Phase 8: Admin Catalog Management (Week 5)
**Goal**: Edit products via admin interface

1. Create `pages/admin/Catalog.jsx` - Product list
2. Create `features/admin/catalog/ProductForm.jsx` - Product CRUD
3. Create `features/admin/catalog/ColorManager.jsx` - Color management
4. Create `features/admin/catalog/PackageManager.jsx` - Package management
5. **Test**: Admin can add/edit/delete products and options

## Order Status Workflow

```
new → quoted → confirmed → in_production → shipped → completed
                    ↓
                cancelled
```

- **new**: Order just submitted
- **quoted**: Price quote sent to customer
- **confirmed**: Customer accepted quote
- **in_production**: Manufacturing started
- **shipped**: Order dispatched
- **completed**: Order delivered and paid
- **cancelled**: Order cancelled

## Design System Compliance

All components must follow CLAUDE.md specifications:

### Colors
```javascript
primaryColor: '#2C2420'
primaryLight: '#8B7355'
bgLight: '#FFFFFF'
bgOffWhite: '#FAFAF9'
bgGray: '#F5F5F4'
textPrimary: '#1A1512'
textSecondary: '#57534E'
```

### Typography
- Headings: font-family: 'Crimson Text', serif
- Body: system font stack with fallbacks
- Scale: xs(12px) → sm(14px) → base(16px) → lg(18px) → xl(20px) → 2xl(24px) → 3xl(30px) → 4xl(36px)

### Components
- Buttons: Primary (dark bg) and Secondary (light bg with border)
- Cards: White bg with subtle shadow, border-radius: 12px
- Inputs: Gray background (#F5F5F4), rounded borders, focus ring

## Success Criteria

- [ ] Customer view: All products accessible via clean URLs
- [ ] Customer view: Order forms work identically to original
- [ ] Customer view: Design matches CLAUDE.md specifications
- [ ] Admin view: Can login with password
- [ ] Admin view: Can view all submitted orders
- [ ] Admin view: Can update order status
- [ ] Admin view: Can add/edit/delete products
- [ ] Admin view: Can manage colors, packages, extra options
- [ ] CMS: Product data editable via Strapi admin
- [ ] CMS: Orders stored in database with all details
- [ ] Code: No hardcoded product data in components
- [ ] Code: All components follow design system
- [ ] Testing: Form calculations match original
- [ ] Testing: Mobile responsive on all pages

## Development Guidelines

1. **Test after each phase**: Verify functionality before moving forward
2. **Commit frequently**: Descriptive messages after each component/feature
3. **Review CLAUDE.md**: Check design specs before creating components
4. **Mobile-first**: Ensure responsive design throughout
5. **Accessibility**: Proper ARIA labels, keyboard navigation
6. **Performance**: Code splitting for admin panel, lazy loading for images

## Next Steps

1. Create Git branch: `refactor/multi-product-cms`
2. Begin Phase 1.1: Extract theme configuration
3. Follow plan rigorously, phase by phase
4. Test thoroughly after each extraction
5. Commit with descriptive messages

## Notes

- Authentication will start simple (password in localStorage) and be upgraded to Strapi auth later
- Payment integration NOT included in this phase
- Order submission via form/email only (no payment processing)
- Admin panel is password-protected but not production-grade security yet
