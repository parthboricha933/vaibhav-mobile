import { MongoClient, Db } from 'mongodb'

// Global cache for MongoDB connection - survives HMR in dev and cold starts in serverless
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined
  // eslint-disable-next-line no-var
  var _mongoDb: Db | undefined
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<Db> {
  // Return cached connection if available
  if (cachedDb && cachedClient) {
    return cachedDb
  }

  // Check global cache (survives serverless cold starts in same instance)
  if (globalThis._mongoDb && globalThis._mongoClient) {
    cachedClient = globalThis._mongoClient
    cachedDb = globalThis._mongoDb
    return cachedDb
  }

  const MONGODB_URI = process.env.MONGODB_URI || ''

  // Validate environment variable at runtime, not at import time
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Go to Vercel Dashboard → Settings → Environment Variables and add MONGODB_URI with your MongoDB Atlas connection string.'
    )
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 10,
      minPoolSize: 0,
    })
    
    await client.connect()
    
    // Always use 'vaibhav_mobiles' as database name
    const db = client.db('vaibhav_mobiles')
    
    // Cache in module scope and global scope
    cachedClient = client
    cachedDb = db
    globalThis._mongoClient = client
    globalThis._mongoDb = db
    
    // Create indexes only on first connection
    try {
      await db.collection('phones').createIndex({ code: 1 }, { unique: true })
      await db.collection('admins').createIndex({ username: 1 }, { unique: true })
    } catch {
      // Index might already exist, that's fine
    }
    
    return db
  } catch (error: unknown) {
    // Reset cache on connection failure
    cachedClient = null
    cachedDb = null
    globalThis._mongoClient = undefined
    globalThis._mongoDb = undefined
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('MongoDB connection error:', errorMessage)
    
    throw new Error(
      `MongoDB connection failed: ${errorMessage}. Please check: 1) MONGODB_URI is set correctly, 2) MongoDB Atlas allows connections from all IPs (0.0.0.0/0), 3) Database user credentials are correct.`
    )
  }
}

// Check if MongoDB is connected and return diagnostic info
export async function checkDatabaseHealth(): Promise<{ connected: boolean; error?: string; phoneCount?: number; adminCount?: number }> {
  try {
    const db = await connectToDatabase()
    const phoneCount = await db.collection('phones').countDocuments()
    const adminCount = await db.collection('admins').countDocuments()
    return { connected: true, phoneCount, adminCount }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return { connected: false, error: errorMessage }
  }
}

// Seed the database with initial data - ONLY call this from the /api/admin/seed endpoint
export async function ensureSeedData(db: Db) {
  try {
    const adminCount = await db.collection('admins').countDocuments()
    
    if (adminCount === 0) {
      console.log('Seeding database...')
      
      // Seed admin
      await db.collection('admins').insertOne({
        username: 'admin',
        password: 'admin123',
        createdAt: new Date(),
      })

      // Seed phones with placeholder images
      const phones = [
        {
          name: 'iPhone 16 Pro Max',
          description: '6.9" Super Retina XDR Display, A18 Pro chip, 48MP Camera System, Titanium Design. The most powerful iPhone ever with advanced AI capabilities.',
          price: '₹1,44,900',
          images: [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop',
          ],
          code: '1001',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Samsung Galaxy S24 Ultra',
          description: '6.8" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 200MP Camera, S Pen Built-in, Galaxy AI Features. The ultimate Android experience.',
          price: '₹1,29,999',
          images: [
            'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop',
          ],
          code: '1002',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'OnePlus 12',
          description: '6.82" 2K LTPO AMOLED, Snapdragon 8 Gen 3, 50MP Hasselblad Camera, 100W SUPERVOOC. Flagship killer with premium camera.',
          price: '₹64,999',
          images: [
            'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop',
          ],
          code: '1003',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Google Pixel 8 Pro',
          description: '6.7" LTPO OLED, Google Tensor G3, 50MP Camera with AI Magic Eraser, 7 Years of Updates. The smartest Android phone.',
          price: '₹1,06,999',
          images: [
            'https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop',
          ],
          code: '1004',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vivo X100 Pro',
          description: '6.78" LTPO AMOLED, Dimensity 9300, ZEISS 50MP Camera System, 100W FlashCharge. Professional-grade mobile photography.',
          price: '₹89,999',
          images: [
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop',
          ],
          code: '1005',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Redmi Note 13 Pro+',
          description: '6.67" AMOLED 120Hz, Dimensity 7200, 200MP Camera, 120W HyperCharge. Best value flagship with incredible camera.',
          price: '₹29,999',
          images: [
            'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop',
          ],
          code: '1006',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      await db.collection('phones').insertMany(phones)
      console.log('Database seeded successfully!')
    }
  } catch (seedError) {
    console.error('Seed error (non-fatal):', seedError)
  }
}
