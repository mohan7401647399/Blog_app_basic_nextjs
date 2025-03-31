/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const inputRef = useRef();
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const searchPost = (e) => {
    if (e.type == 'keydown' && e.key !== 'Enter') return
    setSearch(true)
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/posts?query=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setSearch(false));
  }

  return (
    <div className="bg-gray-300">
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Movie Stars Blogs! 🎬✨</h2>
        <p>Lights, camera, action! 🎥 If you’re passionate about movies and fascinated by the lives of your favorite stars, you’re in the right place. Our Movie Stars Blog is your go-to destination for the latest news, behind-the-scenes stories, celebrity interviews, and exclusive updates from the world of entertainment.
          From Hollywood legends to rising stars, we bring you captivating stories, career journeys, and deep dives into the lives of actors and filmmakers who bring magic to the screen. Whether it’s movie reviews, red carpet moments, or insights into upcoming films, we’ve got it all covered!
          So sit back, grab some popcorn 🍿, and explore the glamorous world of cinema with us. Stay tuned, stay inspired, and enjoy the stardom like never before!</p>
      </main>
      <div className="flex justify-end px-4">
        <input ref={ inputRef } onKeyDown={ searchPost } disabled={ search } type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button onClick={ searchPost } disabled={ search } className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4 hover:shadow-lg hover:scale-105 transition duration-300">{ search ? "Searching..." : "Search" }</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          posts && posts.map((post) => (
            <Link key={ post._id } href={ `/post/${post._id}` }>
              <div className="border border-gray-200 p-4 m-auto">
                <img className="w-full h-48 object-center mb-4 hover:shadow-lg hover:scale-105 transition duration-300" src={ post.image } alt="Post Image" />
                <h2 className="text-xl font-semibold mb-2">{ post.title }</h2>
                <p className="text-gray-600">{ post.short_description }</p>
              </div>
            </Link>
          ))
        }
        {
          !posts.length > 0 && inputRef.current?.value && (
            <p className="text-center text-2xl font-bold">No posts found for your query - <b> { inputRef.current?.value } </b> </p>
          )
        }
      </div>
    </div>
  );
}
