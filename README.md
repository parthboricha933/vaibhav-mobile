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
- **Vercel Ready** — Uses MongoDB Atlas (cloud database) for full serverless compatibility

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: MongoDB Atlas (cloud) with native MongoDB driver
- **Authentication**: Cookie-based admin sessions
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Image Storage**: Base64 in database (no filesystem dependency — works on Vercel)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free tier)

### 1. Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (free M0 tier)
3. Create a database user with username and password
4. Add `0.0.0.0/0` to the IP Access List (allow connections from anywhere)
5. Click "Connect" → "Connect your application" → Copy the connection string
6. Replace `<username>`, `<password>`, and cluster info in the connection string

### 2. Install & Run

```bash
# Clone the repository
git clone https://github.com/parthboricha933/vaibhav-mobile.git
cd vaibhav-mobile

# Install dependencies
npm install

# Create .env file with your MongoDB connection string
cp .env.example .env
# Edit .env and add your MONGODB_URI

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The database will **auto-seed** on first request with:
- Admin account (username: `admin`, password: `admin123`)
- 6 sample phones

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import the repository
3. Add environment variable: `MONGODB_URI` = your MongoDB Atlas connection string
4. Deploy!

### Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Project Structure

```
├── public/
│   ├── logo.png               # Store logo
│   ├── hero-slide-*.png       # Hero slideshow images
│   └── uploads/               # Legacy upload dir (not used on Vercel)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── phones/        # Phone CRUD API
│   │   │   ├── inquiries/     # Inquiry API
│   │   │   ├── admin/         # Admin auth + seed API
│   │   │   └── upload/        # Image upload API (base64)
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
│       ├── db.ts              # MongoDB connection + auto-seed
│       └── utils.ts           # Utility functions
├── .env.example               # Environment variable template
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
| GET | `/api/admin/login` | Check admin session |
| POST | `/api/admin/seed` | Seed database |
| POST | `/api/upload` | Upload images (returns base64) |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |

## License

This project is private and owned by Vaibhav Mobiles, Rajula.
