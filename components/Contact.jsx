'use client'
import React, { useState } from 'react'

const Contact = () => {
    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState('');

    const handleInput = (e) => {
        setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/enquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();
            setMessage(data.message);
            setInputs({});

            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            setMessage('Something went wrong! Please try again.');
        }
    };

    return (
        <main className="container mx-auto px-4 py-6">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={ handleSubmit } className="w-full max-w-lg">
                <div className="flex items-center mb-4">
                    <label htmlFor="name" className="w-1/4">Name:</label>
                    <input
                        name="name"
                        value={ inputs.name ?? '' }
                        onChange={ handleInput }
                        type="text"
                        id="name"
                        className="border rounded px-2 py-1 w-3/4"
                        required
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="email" className="w-1/4">Email:</label>
                    <input
                        name="email"
                        value={ inputs.email ?? '' }
                        onChange={ handleInput }
                        type="email"
                        id="email"
                        className="border rounded px-2 py-1 w-3/4"
                        required
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label htmlFor="message" className="w-1/4">Message:</label>
                    <textarea
                        name="message"
                        value={ inputs.message ?? '' }
                        onChange={ handleInput }
                        id="message"
                        className="border rounded px-2 py-1 w-3/4"
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:shadow-lg hover:scale-105 transition duration-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
            { message && <p className="mt-4 text-green-600">{ message }</p> }
        </main>
    );
};

export default Contact;