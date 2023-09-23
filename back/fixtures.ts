import mongoose from "mongoose";
import config from "./config";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    await db.close();
};

run().catch(console.error);