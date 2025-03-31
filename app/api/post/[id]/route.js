import { NextResponse } from 'next/server';
import connectMongoDb from '../../../../utils/connectMongodb';
import PostModel from '../../../../model/postModel';
import mongoose from 'mongoose';

export async function GET(req, context) {
    try {
        await connectMongoDb();

        // Await the params object before accessing `id`
        const params = await context.params;
        const id = params.id;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid Post ID' }, { status: 400 });
        }

        const postData = await PostModel.findById(id);
        if (!postData) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(postData, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
