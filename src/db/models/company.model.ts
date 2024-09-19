import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
	name: { type: String },
	founderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Founder' },
});

export default mongoose.models.Company ||
	mongoose.model('Company', companySchema);
