// src/models/jobTrack.model.js

import mongoose from 'mongoose';

const JobTrackSchema = new mongoose.Schema({
    company: {
        type: String,
        trim: true,
        required: 'Company name is required'
    },
    role: {
        type: String,
        trim: true,
        required: 'Job role is required'
    },
    status: {
        type: String,
        enum: ['Applied', 'Pending', 'Interviewing', 'Offer', 'Rejected'],
        default: 'Applied'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String,
        trim: true,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    // The link to the user, used by your controller logic
    userId: { 
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date // For tracking updates
});

export default mongoose.model('Job', JobTrackSchema);