import React from 'react';
import { User, Bot } from 'lucide-react';

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  
  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 mb-1 px-1">
        {isUser ? (
          <>
            <span className="text-xs text-slate-500 font-medium">You</span>
            <User className="w-4 h-4 text-slate-500" />
          </>
        ) : (
          <>
            <Bot className="w-4 h-4 text-indigo-500" />
            <span className="text-xs text-indigo-500 font-medium">Agent</span>
          </>
        )}
      </div>
      <div 
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
          isUser 
            ? 'bg-indigo-600 text-white rounded-tr-none' 
            : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
