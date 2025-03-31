import connectMongoDb from "../../../utils/connectMongodb";
import PostModel from "../../../model/postModel";

export async function GET(req) {
    const query = req.nextUrl.searchParams.get("query")
    try {
        await connectMongoDb()
        let postData
        if (query) {
            postData = await PostModel.find({
                $or: [
                    { title: new RegExp(query, "i") },
                    { description: new RegExp(query, "i") }
                ]
            })
        } else {
            postData = await PostModel.find({})
        }
        return Response.json(postData)
    } catch (error) {
        console.log(error)
        return Response.json({ error: error.message })
    }
}