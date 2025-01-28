import mongoose from "mongoose";

const PublishCourseSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
        // minlength: 5,
        // required: [true, "Title not provided"]
    }, 
    subtitle: {
        default: "",
        type: String
    },
    description: {
        default: "",
        type: String,
        // required: [true, "Description not provided"]
    },
    language: {
        default: "",
        type: String
    },
    level: {
        default: "",
        type: String
    },
    category: {
        default: "",
        type: String
    },
    course_image_url: {
        default: "",
        type: String
    },
    promo_video_url: {
        default: "",
        type: String
    },
    pricing: {
        default: "",
        type: Number
    }
})


export default mongoose.model("PublishCourse", PublishCourseSchema);