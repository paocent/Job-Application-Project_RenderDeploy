import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    // Name of the person giving the testimonial
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    // The content of the review/quote
    quote: {
        type: String,
        required: 'Quote content is required'
    },
    // Role/Company of the person
    roleOrCompany: { 
        type: String,
        trim: true,
        default: ''
    },
    // Star rating (e.g., 4 or 5)
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    // Date the testimonial was recorded
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Testimonial', TestimonialSchema);