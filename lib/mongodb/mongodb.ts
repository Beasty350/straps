// Do NOT import MongoClient at the top level
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

let clientPromise: Promise<any>;

export async function getMongoClient() {
    // 1. Check if we already have a connection
    if (clientPromise) return clientPromise;

    // 2. ONLY import the library when this function is called
    const { MongoClient } = await import('mongodb');

    if (process.env.NODE_ENV === 'development') {
        let globalWithMongo = global as any;
        if (!globalWithMongo._mongoClientPromise) {
            const client = new MongoClient(uri);
            globalWithMongo._mongoClientPromise = client.connect();
        }
        clientPromise = globalWithMongo._mongoClientPromise;
    } else {
        const client = new MongoClient(uri);
        clientPromise = client.connect();
    }
    
    return clientPromise;
}