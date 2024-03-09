import mongoose from "mongoose";

class Database{
  constructor(url) {
    this.url = url
  }

  async connectionDb() {
    try {
      await mongoose.connect(this.url, {
        dbName : process.env.DB_NAME
      });
      console.log("MongoDB connection established successfully");
    } catch (error) {
      console.log(error);
    }
  }
}

export default Database;
