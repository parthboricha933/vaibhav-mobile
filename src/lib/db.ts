import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db('vaibhav_mobiles')
    
    cachedClient = client
    cachedDb = db
    
    // Create indexes
    await db.collection('phones').createIndex({ code: 1 }, { unique: true })
    await db.collection('admins').createIndex({ username: 1 }, { unique: true })
    
    return db
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// Auto-seed the database if empty
export async function ensureSeedData(db: Db) {
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
}
