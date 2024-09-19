import mongoose from 'mongoose';

export const founderSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
});

export default mongoose.models.Founder ||
	mongoose.model('Founder', founderSchema);
