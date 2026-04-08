import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import models to register them
import './Model/User.js';
import './Model/Product.js';
import './Model/Bid.js';
import './Model/Order.js';

const MONGOURL = process.env.MONGO_URL;

async function createCollections() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGOURL);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Create collections if they don't exist
    const collections = ['users', 'products', 'bids', 'orders'];

    for (const collectionName of collections) {
      const collectionsList = await db.listCollections({ name: collectionName }).toArray();
      if (collectionsList.length === 0) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created`);
      } else {
        console.log(`Collection '${collectionName}' already exists`);
      }
    }

    // Ensure indexes are created
    await mongoose.model('Bid').ensureIndexes();
    console.log('Indexes ensured for Bid model');

    console.log('All collections and indexes are ready');
  } catch (error) {
    console.error('Error creating collections:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed');
  }
}

createCollections();