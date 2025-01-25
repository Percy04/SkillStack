import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: [true, "Title not provided"]
    }, 
    subtitle: {
        type: String
    },
    description: {
        type: String,
        required: [true, "Description not provided"]
    },
    language: {
        type: String
    },
    level: {
        type: String
    },
    category: {
        type: String
    },
    concept: {
        type: String
    }, 
    course_image_url: {
        type: String
    },
    promo_video_url: {
        type: String
    }
    
})


export default mongoose.model("Course", courseSchema);