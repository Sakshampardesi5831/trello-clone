# 🚀 Trello Clone - Modern Project Management Platform

A full-stack Trello clone built with Next.js 14, TypeScript, and modern web technologies. This project demonstrates advanced React development, real-time collaboration features, and enterprise-grade architecture.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)
![Prisma](https://img.shields.io/badge/Prisma-5.17-2D3748)

## ✨ Features

### 🎯 Core Functionality
- **Board Management**: Create, update, and delete boards with custom images
- **List Management**: Organize tasks into customizable lists
- **Card Management**: Create, edit, and manage task cards
- **Drag & Drop**: Intuitive drag-and-drop functionality for reordering
- **Real-time Updates**: Live activity tracking and collaboration

### 🔐 Authentication & Security
- **Clerk Integration**: Secure authentication with multi-tenant support
- **Organization Management**: Multi-organization workspace support
- **Role-based Access**: User permissions and team management
- **Audit Logging**: Complete activity tracking and history

### 💳 Subscription & Billing
- **Stripe Integration**: Secure payment processing
- **Usage Limits**: Free tier with upgrade options
- **Subscription Management**: Automated billing and renewals
- **Webhook Processing**: Real-time subscription updates

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: System theme detection and manual toggle
- **Accessibility**: WCAG compliant with screen reader support
- **Performance**: Optimized with React Server Components

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Prisma ORM** - Database management
- **MySQL** - Primary database
- **Server Actions** - Type-safe server functions

### Authentication & Payments
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing and subscriptions
- **Unsplash API** - Image integration

### Development Tools
- **Bun** - Fast package manager (recommended)
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prisma** - Database migrations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- MySQL database
- Clerk account
- Stripe account (for payments)
- Unsplash API key

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd trello-dev
```

2. **Install dependencies**
```bash
bun install
# or
npm install
```

3. **Environment Setup**
Create a `.env.local` file with the following variables:
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

4. **Database Setup**
```bash
bunx prisma generate
bunx prisma db push
```

5. **Start Development Server**
```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
trello-dev/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Marketing pages
│   ├── (platform)/             # Main application
│   │   ├── (clerk)/             # Authentication pages
│   │   └── (dashboard)/         # Dashboard pages
│   └── api/                     # API routes
├── actions/                     # Server Actions
├── components/                  # Reusable components
│   ├── ui/                     # Base UI components
│   └── form/                   # Form components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── constants/                  # Application constants
├── config/                     # Configuration files
└── prisma/                     # Database schema
```

## 🗄️ Database Schema

### Core Models
- **Board**: Project boards with custom images
- **List**: Task organization within boards
- **Card**: Individual tasks with descriptions
- **AuditLog**: Complete activity tracking
- **OrgLimit**: Usage tracking for organizations
- **OrgSubscription**: Stripe subscription management

## 🔧 Development

### Available Scripts
```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
```

### Database Management
```bash
bunx prisma generate     # Generate Prisma client
bunx prisma db push      # Push schema changes
bunx prisma studio       # Open database GUI
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Environment Variables for Production
- Set up MySQL database (PlanetScale, Railway, or similar)
- Configure Clerk production keys
- Set up Stripe webhook endpoints
- Add Unsplash API key

## 📊 Features Showcase

### 🎯 Activity Feed
- Real-time activity tracking
- Color-coded action badges (Green=Create, Yellow=Update, Red=Delete)
- Responsive design with scrollable container
- User-friendly activity descriptions

### 🎨 Modern UI Components
- Drag & drop functionality
- Responsive card layouts
- Loading states and skeletons
- Accessibility features

### 🔐 Enterprise Features
- Multi-tenant organization support
- Role-based permissions
- Audit logging and compliance
- Subscription management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Clerk](https://clerk.com/) - Authentication
- [Stripe](https://stripe.com/) - Payments
- [Prisma](https://prisma.io/) - Database ORM
- [Radix UI](https://www.radix-ui.com/) - Component primitives

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**
