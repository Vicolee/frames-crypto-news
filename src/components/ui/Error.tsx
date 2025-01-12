"use client";

import { useState } from 'react';

export const ErrorScreen = () => {
    const [showDonation, setShowDonation] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center mt-8">
            <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemtmeXJ3dDlscmtuaGtrYmhsbTljbzg0OTU1OXF3ZjBkYnI1ZDJzcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K6WIhJ07gwGkIAQfwN/giphy.gif" // Replace with your cute image
                alt="Dog"
                className="rounded-full mb-4"
            />
            <p className="text-center text-gray-600 mb-4">
                Oops! Something went wrong. <br />
                Our cute kitten is sad and needs your help to fix this.
            </p>
            {!showDonation && (
                <button
                    onClick={() => setShowDonation(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cheer up the kitten!
                </button>
            )}
            {showDonation && (
                <div className="text-center">
                    <p>
                        You can donate some catnip (or coffee for the developers) here:
                    </p>
                    {/* <a
                        href="https://your-donation-link.com" // Replace with your donation link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        Donate
                    </a> */}
                </div>
            )}
        </div>
    );
};