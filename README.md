# Vaibhav Mobiles - Premium Smartphone Store

A modern, responsive mobile store website for **Vaibhav Mobiles (Rajula)** — browse smartphones, inquire about prices, and manage inventory through a secure admin panel.

## Features

- **Hero Section** — Full-screen hero with parallax scrolling, 4-image auto-rotating slideshow, golden particle effects, and smooth animations
- **Phone Listing** — Responsive grid of phone cards with image carousel, search functionality, and hover effects
- **Inquiry System** — Customers can submit inquiries (name, mobile, message) for any phone, stored in the database
- **Phone Detail Modal** — View detailed phone info with multi-image gallery and thumbnail strip
- **Admin Panel** — Secure login, full CRUD for phones (add/edit/delete), image upload from device (multiple images), and inquiry management
- **Unique Codes** — Auto-generated 4-digit unique code for each phone
- **Dark Theme** — Black + Gold/Amber color scheme throughout
- **Mobile First** — Fully responsive with hamburger menu on mobile
- **Smooth Animations** — Powered by Framer Motion

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT-based admin sessions (cookie)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Upload**: Multer (multi-image device upload)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/parthboricha933/vaibhav-mobile.git
cd vaibhav-mobile

# Install dependencies
npm install

# Set up the database
npx prisma db push

# Seed the database (creates admin account + sample phones)
curl -X POST http://localhost:3000/api/admin/seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   ├── logo.png               # Store logo
│   ├── hero-slide-*.png       # Hero slideshow images
│   └── uploads/               # Uploaded phone images
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── phones/        # Phone CRUD API
│   │   │   ├── inquiries/     # Inquiry API
│   │   │   ├── admin/         # Admin auth API
│   │   │   └── upload/        # File upload API
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/
│   │   ├── hero-section.tsx   # Hero with slideshow
│   │   ├── navbar.tsx         # Sticky navbar
│   │   ├── phone-listing.tsx  # Phone grid + search
│   │   ├── phone-card.tsx     # Phone card with carousel
│   │   ├── phone-detail-modal.tsx
│   │   ├── inquiry-modal.tsx
│   │   ├── admin-panel.tsx    # Admin CRUD dashboard
│   │   ├── admin-login-modal.tsx
│   │   ├── contact-section.tsx
│   │   ├── footer.tsx
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── db.ts              # Prisma client
│       └── utils.ts           # Utility functions
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/phones` | Get all phones |
| POST | `/api/phones` | Add a new phone |
| GET | `/api/phones/[id]` | Get phone by ID |
| PUT | `/api/phones/[id]` | Update phone |
| DELETE | `/api/phones/[id]` | Delete phone |
| GET | `/api/inquiries` | Get all inquiries |
| POST | `/api/inquiries` | Submit inquiry |
| POST | `/api/admin/login` | Admin login |
| DELETE | `/api/admin/login` | Admin logout |
| POST | `/api/admin/seed` | Seed database |
| POST | `/api/upload` | Upload images |

## License

This project is private and owned by Vaibhav Mobiles, Rajula.
