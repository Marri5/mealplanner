import mongoose from 'mongoose';
import { useRuntimeConfig } from '#imports';

export async function connectDB() {
  try {
    const config = useRuntimeConfig();
    const mongodbUri = config.mongodbUri || 'mongodb://localhost:27017/meal-planner';

    await mongoose.connect(mongodbUri, {
      // These are included in the type but not needed explicitly since they're default in newer versions
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log('Connected to MongoDB successfully');

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
} 