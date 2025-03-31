import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-black shadow-lg">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link href="/"><h1 className="text-4xl text-white hover:underline font-bold">Blog</h1></Link>
                <nav className="space-x-4">
                    <Link href="/" className="text-blue-500 text-2xl hover:underline">Home</Link>
                    <Link href="/about" className="text-blue-500 text-2xl hover:underline">About</Link>
                    <Link href="/contact" className="text-blue-500 text-2xl hover:underline">Contact</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header
