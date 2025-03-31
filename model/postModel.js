import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    created_at: String
}, { toJSON: { virtuals: true } })

postSchema.virtual('short_description').get(function () {
    return this.description.substr(0, 100) + '...'
})

postSchema.virtual('created_at_formatted').get(function () {
    return changeDateFormat(this.created_at)
})

function changeDateFormat(date_string) {
    const date = new Date(date_string);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const Post = models.Post || model("Post", postSchema)

export default Post