import React, { useEffect, useState } from 'react'
import useConversation from '../statemanage/useConversation.js';
import axios from 'axios';

export default function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();



    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const response = await axios.get(`/api/message/get/${selectedConversation._id}/messages`);
                    // const data = await response.json();
                    setMessages(response.data);
                    setLoading(false);
                } catch (error) {
                    console.log("Error in useGetMessage" + error);
                } finally {
                    setLoading(false);
                }
            }
        };
        getMessages();
    }, [selectedConversation, setMessages]);
    return {
        messages,
        loading
    }
}
