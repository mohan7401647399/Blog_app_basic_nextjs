import { models, Schema, model } from "mongoose";

const enquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Enquiry = models.Enquiry || model('Enquiry', enquirySchema);

export default Enquiry