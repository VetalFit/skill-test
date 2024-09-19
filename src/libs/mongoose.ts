import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI)
			.then((mongoose) => mongoose);
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
