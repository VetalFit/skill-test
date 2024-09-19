import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
	position: { type: String },
});

export default mongoose.models.Employee ||
	mongoose.model('Employee', employeeSchema);
