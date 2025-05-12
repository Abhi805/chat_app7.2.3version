import React, { useState } from 'react';
import useConversation from '../statemanage/useConversation.js';
import axios from 'axios';

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessages = async (message) => {
        setLoading(true);
        if (selectedConversation && selectedConversation._id) {
            try {
                const response = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
                setMessages([...messages, response.data]);  // Add new message to the state
                setLoading(false);
            } catch (error) {
                console.log("Error in send Message", error);
            } finally {
                setLoading(false);
            }
        }
    }; 

    return { loading, sendMessages };  // Only return the function and loading state
}

export default useSendMessage;
