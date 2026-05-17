import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { Loader2 } from 'lucide-react';

export default function ChatWindow({ messages, loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-4">
      {messages.length === 0 ? (
        <div className="text-center text-slate-500 mt-10">
          <p>Hello! I am your layout agent.</p>
          <p className="text-sm mt-2">Try saying: "Convert this design to 9:16"</p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <MessageBubble key={idx} role={msg.role} content={msg.content} />
        ))
      )}
      
      {loading && (
        <div className="flex justify-start">
          <div className="bg-slate-100 rounded-2xl px-4 py-3 border border-slate-200">
            <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
