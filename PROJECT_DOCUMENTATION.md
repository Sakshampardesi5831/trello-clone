# Trello Clone - Project Documentation

## 📋 Project Overview

This is a modern, full-stack Trello clone built with Next.js 14, TypeScript, and Prisma. The application provides a comprehensive project management solution with drag-and-drop functionality, real-time collaboration, and enterprise-grade features.

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Daisy UI
- **UI Components**: Radix UI + Shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Drag & Drop**: @hello-pangea/dnd
- **Authentication**: Clerk

### Backend
- **Database**: MySQL with Prisma ORM
- **Server Actions**: Next.js Server Actions
- **API Routes**: Next.js API Routes
- **Payments**: Stripe Integration
- **Image Service**: Unsplash API

### Development Tools
- **Package Manager**: Bun (recommended)
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Database Management**: Prisma

## 📁 Project Structure

```
trello-dev/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Marketing pages
│   ├── (platform)/             # Main application
│   │   ├── (clerk)/             # Authentication pages
│   │   └── (dashboard)/         # Dashboard pages
│   │       ├── board/[boardId]/ # Board-specific pages
│   │       └── organization/[id]/ # Organization pages
│   └── api/                     # API routes
├── actions/                     # Server Actions
│   ├── create-board/
│   ├── update-board/
│   ├── delete-board/
│   ├── create-list/
│   ├── update-list/
│   ├── delete-list/
│   ├── create-card/
│   ├── update-card/
│   ├── delete-card/
│   ├── copy-card/
│   ├── copy-list/
│   ├── update-card-order/
│   ├── update-list-order/
│   └── stripe-redirect/
├── components/                  # Reusable components
│   ├── ui/                     # Base UI components
│   ├── form/                   # Form components
│   └── models/                 # Modal components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── constants/                  # Application constants
├── config/                     # Configuration files
└── prisma/                     # Database schema
```

## 🗄️ Database Schema

### Core Models

#### Board (Broad)
- **id**: Unique identifier
- **orgId**: Organization ID
- **title**: Board title
- **imageId**: Unsplash image ID
- **imageThumbUrl**: Thumbnail URL
- **imageFullUrl**: Full image URL
- **imageUserName**: Image author
- **imageLinkHTML**: Image attribution
- **createdAt/updatedAt**: Timestamps

#### List
- **id**: Unique identifier
- **title**: List title
- **order**: Sort order
- **boardId**: Parent board reference
- **createdAt/updatedAt**: Timestamps

#### Card
- **id**: Unique identifier
- **title**: Card title
- **order**: Sort order
- **description**: Optional description
- **listId**: Parent list reference

#### AuditLog
- **id**: Unique identifier
- **orgId**: Organization ID
- **action**: CREATE/UPDATE/DELETE
- **entityId**: Target entity ID
- **entityTitle**: Target entity title
- **entityType**: BOARD/LIST/CARD
- **userId**: User who performed action
- **userImage**: User avatar
- **userName**: User name
- **createdAt/updatedAt**: Timestamps

#### OrgLimit
- **id**: Unique identifier
- **orgId**: Organization ID
- **count**: Current board count
- **createdAt/updatedAt**: Timestamps

#### OrgSubscription
- **id**: Unique identifier
- **orgId**: Organization ID
- **stripeCustomerId**: Stripe customer ID
- **stripeSubscriptionId**: Stripe subscription ID
- **stripePriceId**: Stripe price ID
- **stripeCurrentPeriodEnd**: Subscription end date

## 🔐 Authentication & Authorization

### Clerk Integration
- **Authentication**: Sign-in/Sign-up flows
- **Organization Management**: Multi-tenant support
- **User Management**: Profile and avatar handling
- **Middleware**: Route protection and redirection

### Route Protection
- Public routes: `/sign-in`, `/sign-up`
- Protected routes: All dashboard routes
- Organization selection: `/select-org`
- Automatic redirects based on auth state

## 🎯 Core Features

### 1. Board Management
- **Create Boards**: With custom images from Unsplash
- **Update Boards**: Title and image modification
- **Delete Boards**: With cascade deletion
- **Board Navigation**: Seamless board switching

### 2. List Management
- **Create Lists**: Add new columns to boards
- **Update Lists**: Title modification
- **Delete Lists**: With card cleanup
- **Reorder Lists**: Drag and drop functionality

### 3. Card Management
- **Create Cards**: Add tasks to lists
- **Update Cards**: Title and description editing
- **Delete Cards**: Remove tasks
- **Copy Cards**: Duplicate functionality
- **Reorder Cards**: Drag and drop within and between lists

### 4. Drag & Drop
- **@hello-pangea/dnd**: Modern drag and drop library
- **Cross-list Movement**: Cards can move between lists
- **Order Persistence**: Server-side order updates
- **Real-time Updates**: Optimistic UI updates

### 5. Activity Tracking
- **Audit Logs**: Complete action history
- **User Attribution**: Who did what and when
- **Activity Feed**: Real-time activity display
- **Entity Tracking**: Board, list, and card changes

### 6. Organization Management
- **Multi-tenant**: Multiple organizations per user
- **Organization Switching**: Easy context switching
- **Member Management**: Team collaboration
- **Settings**: Organization-specific configurations

## 💳 Subscription & Billing

### Stripe Integration
- **Customer Management**: Stripe customer creation
- **Subscription Handling**: Recurring billing
- **Webhook Processing**: Real-time subscription updates
- **Payment Methods**: Secure payment processing

### Usage Limits
- **Free Tier**: Limited board creation
- **Pro Tier**: Unlimited boards and features
- **Usage Tracking**: Real-time limit monitoring
- **Upgrade Prompts**: Seamless upgrade flow

## 🎨 UI/UX Features

### Design System
- **Tailwind CSS**: Utility-first styling
- **Daisy UI**: Component library
- **Radix UI**: Accessible primitives
- **Shadcn/ui**: Custom component system

### Responsive Design
- **Mobile-first**: Optimized for all devices
- **Breakpoints**: Responsive grid system
- **Touch Support**: Mobile drag and drop
- **Adaptive Layout**: Context-aware UI

### Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Color Contrast**: WCAG compliant

## 🔧 Development Features

### Type Safety
- **TypeScript**: Full type coverage
- **Zod Validation**: Runtime type checking
- **Prisma Types**: Database type safety
- **API Types**: Endpoint type definitions

### Error Handling
- **Safe Actions**: Wrapped server actions
- **Error Boundaries**: Graceful error handling
- **Validation**: Form and input validation
- **User Feedback**: Clear error messages

### Performance
- **Server Components**: Optimized rendering
- **Client Components**: Minimal client-side code
- **Caching**: React Query caching
- **Optimistic Updates**: Immediate UI feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun (recommended) or npm
- MySQL database
- Clerk account
- Stripe account (for payments)
- Unsplash API key

### Environment Variables
```env
DATABASE_URL="mysql://user:password@localhost:3306/trello_dev"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/select-org"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/select-org"
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
UNSPLASH_ACCESS_KEY="your_unsplash_key"
```

### Installation
```bash
# Install dependencies
bun install

# Setup database
bunx prisma generate
bunx prisma db push

# Start development server
bun run dev
```

## 📊 API Endpoints

### Server Actions
- `createBoard`: Create new board
- `updateBoard`: Update board details
- `deleteBoard`: Remove board
- `createList`: Add new list
- `updateList`: Modify list
- `deleteList`: Remove list
- `createCard`: Add new card
- `updateCard`: Modify card
- `deleteCard`: Remove card
- `copyCard`: Duplicate card
- `copyList`: Duplicate list
- `updateCardOrder`: Reorder cards
- `updateListOrder`: Reorder lists

### API Routes
- `GET /api/cards/[cardId]`: Fetch card details
- `GET /api/cards/[cardId]/logs`: Fetch card activity
- `POST /api/webhook`: Stripe webhook handler

## 🧪 Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- Hook testing with custom test utilities
- Utility function testing

### Integration Tests
- Server action testing
- API endpoint testing
- Database operation testing

### E2E Tests
- User workflow testing
- Authentication flow testing
- Payment flow testing

## 🚀 Deployment

### Vercel (Recommended)
- Automatic deployments from Git
- Environment variable management
- Database connection handling
- Stripe webhook configuration

### Database
- MySQL on PlanetScale or similar
- Connection pooling
- Backup strategies
- Migration management

## 📈 Monitoring & Analytics

### Performance Monitoring
- Core Web Vitals tracking
- Bundle size optimization
- Database query optimization
- Error tracking

### User Analytics
- Feature usage tracking
- User behavior analysis
- Conversion funnel analysis
- Performance metrics

## 🔒 Security

### Authentication Security
- JWT token validation
- Session management
- CSRF protection
- Rate limiting

### Data Security
- Input sanitization
- SQL injection prevention
- XSS protection
- Secure headers

### Payment Security
- PCI compliance
- Secure webhook handling
- Data encryption
- Audit logging

## 📚 Additional Resources

### Documentation
- Next.js Documentation
- Prisma Documentation
- Clerk Documentation
- Stripe Documentation
- Tailwind CSS Documentation

### Community
- GitHub Issues
- Discord Community
- Stack Overflow
- Reddit Communities

---

*This documentation is maintained alongside the codebase and should be updated with any architectural changes or new features.*
