import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import useSendMessage from '../../context/useSendMessage.js';

export default function Type() {
    const { loading, sendMessages } = useSendMessage();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {  // Only send if message is not empty
            await sendMessages(message);  // Call the sendMessages function here
            setMessage("");  // Clear the message input
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex space-x-3 h-[8vh] text-center bg-gray-800">
                <div className="w-[70%] mx-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type here"
                        className="border-[1px] py-3 px-3 border-gray-700 rounded-xl bg-slate-700 flex items-center w-full grow outline-none mt-2"
                    />
                </div>
                <button className="text-3xl">
                    <IoIosSend />
                </button>
            </div>
        </form>
    );
}
 