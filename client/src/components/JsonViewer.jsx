import React from 'react';

export default function JsonViewer({ layout }) {
  return (
    <div className="text-slate-300 p-4 text-xs font-mono">
      <h3 className="text-slate-100 font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
        Layout State JSON
      </h3>
      <pre className="overflow-x-auto">
        {JSON.stringify(layout, null, 2)}
      </pre>
    </div>
  );
}
