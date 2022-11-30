import mongoose from "mongoose";

export class MongooseConnection {
  constructor(url: string) {
    this.connect(url);
  }

  async connect(url: string): Promise<void> {
    try {
      await mongoose.connect(url);
    } catch (error) {
      console.error(error);
    }
  }
}
