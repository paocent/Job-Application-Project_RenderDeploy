import Testimonial from '../models/testimonial.model.js';
import errorHandler from './error.controller.js';

/**
 * Lists all testimonials. (No sign-in required, as this is public data)
 */
const list = async (req, res) => {
    try {
        let testimonials = await Testimonial.find({})
            .select('name quote roleOrCompany rating created') // Select only the necessary public fields
            .sort({ created: -1 }); // Show newest testimonials first
        
        res.json(testimonials);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

// Optionally, add a function to create a new testimonial (e.g., from an admin panel)
/*
const create = async (req, res) => {
    // ... logic to save a new Testimonial document ...
}
*/

export default { 
    list,
    // create 
};