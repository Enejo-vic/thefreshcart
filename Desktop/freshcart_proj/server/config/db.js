const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
    // Already connected
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // Prevent multiple simultaneous connections
    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000,
            })
            .then(() => {
                console.log("MongoDB Connected");
                return mongoose.connection;
            })
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }

    return connectionPromise;
};

module.exports = connectDB;