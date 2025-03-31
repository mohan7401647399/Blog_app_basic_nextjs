import Post from "../../../components/Posts";

export async function generateMetadata({ params }) {
    const id = params.id;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/post/${id}`);

        if (!res.ok) throw new Error("Failed to fetch post data");

        const post = await res.json();

        return {
            title: post?.title || "Post Details"
        };
    } catch (error) {
        return {
            title: "Post Not Found"
        };
    }
}

const Page = () => {
    return <Post />;
};

export default Page;