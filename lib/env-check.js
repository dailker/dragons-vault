import mongoose from 'mongoose';

export class EnvChecker {
  static connectionStatus = { isValid: true, errors: [], lastCheck: null };
  static checkInterval = null;

  static async checkEnvironment() {
    const errors = [];
    
    // Check required environment variables
    if (!process.env.MONGO_ATLAS_URI) {
      errors.push('MONGO_ATLAS_URI is not set in .env.local');
    }
    
    // Test MongoDB connection if URI exists
    if (process.env.MONGO_ATLAS_URI) {
      try {
        const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI, { 
          serverSelectionTimeoutMS: 5000,
          maxPoolSize: 1
        });
        await conn.connection.close();
      } catch (error) {
        errors.push(`MongoDB connection failed: ${error.message}`);
      }
    }
    
    const result = {
      isValid: errors.length === 0,
      errors,
      lastCheck: new Date().toISOString()
    };
    
    this.connectionStatus = result;
    return result;
  }

  static startPeriodicCheck() {
    if (typeof window === 'undefined') {
      this.checkInterval = setInterval(async () => {
        await this.checkEnvironment();
      }, 10 * 60 * 1000); // 10 minutes
    }
  }

  static getStatus() {
    return this.connectionStatus;
  }
}