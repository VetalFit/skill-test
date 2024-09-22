import mongoose from 'mongoose';
import companyModel from './company.model';

const employeeSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: companyModel },
	position: { type: String },
});

export default mongoose.models.Employee ||
	mongoose.model('Employee', employeeSchema);
