'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/post/${id}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setPost(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">Error: { error }</p>;

    return (
        post && (
            <main className="container mx-auto p-3">
                <h2 className="text-4xl font-bold m-2">{ post.title }</h2>
                <p className="text-gray-500 m-2">Published on { post.created_at_formatted }</p>
                <div className="flex sm:flex-row md:flex-row flex-col m-2">
                    { post.image && (
                        <img src={ post.image } alt="Post Image" className="my-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300" />
                    ) }
                    <p className="text-gray-900 p-3 m-3 text-justify text-wrap">{ post.description }</p>
                </div>
            </main>
        )
    );
};

export default Post;