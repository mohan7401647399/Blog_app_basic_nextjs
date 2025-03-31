import connectMongodb from "../../../utils/connectMongodb"
import EnquireModel from "../../../model/enquireModel"

export async function POST(req) {
    try {
        const { name, email, message } = await req.json()
        const enquiry = { name, email, message }
        await connectMongodb()
        await EnquireModel.create(enquiry)
        return Response.json({ message: "Enquiry submitted successfully" })
    } catch (error) {
        return Response.json({ error: error._message })
    }
}