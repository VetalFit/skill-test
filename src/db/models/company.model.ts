import mongoose from 'mongoose';
import founderModel from './founder.model';

const companySchema = new mongoose.Schema({
	name: { type: String },
	founderId: { type: mongoose.Schema.Types.ObjectId, ref: founderModel },
});

export default mongoose.models.Company ||
	mongoose.model('Company', companySchema);
