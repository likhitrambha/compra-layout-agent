import { useState } from 'react';
import axios from 'axios';
import initialLayout from '../data/initialLayout.json';

const API_URL = 'http://localhost:3001/api/chat';

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayout);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const newUserMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setLoading(true);

    try {
      const { data } = await axios.post(API_URL, {
        message: text,
        layout,
        history: messages.slice(-6) // Send last 6 messages for context
      });

      setLayout(data.updatedLayout);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.explanation }
      ]);
    } catch (err) {
      console.error("Chat API Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong communicating with the layout agent backend.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { layout, messages, loading, sendMessage };
}
