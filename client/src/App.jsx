import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import JsonViewer from './components/JsonViewer';
import WireframePreview from './components/WireframePreview';
import { useLayoutAgent } from './hooks/useLayoutAgent';
import { LayoutTemplate } from 'lucide-react';

function App() {
  const { layout, messages, loading, sendMessage } = useLayoutAgent();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-50">
      <header className="h-16 flex-shrink-0 bg-white border-b px-6 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2 text-indigo-600">
          <LayoutTemplate className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-slate-800">Layout Agent</h1>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Chat */}
        <section className="w-[400px] flex-shrink-0 border-r bg-white flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <ChatWindow messages={messages} loading={loading} />
          </div>
          <div className="p-4 border-t bg-slate-50">
            <ChatInput onSend={sendMessage} disabled={loading} />
          </div>
        </section>

        {/* Right Column: Preview & JSON */}
        <section className="flex-1 flex overflow-hidden">
          {/* Wireframe Preview */}
          <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-2xl mx-auto shadow-xl bg-white rounded-lg overflow-hidden border border-slate-200">
                <WireframePreview layout={layout} />
            </div>
          </div>
          
          {/* JSON Viewer Sidebar */}
          <div className="w-[400px] flex-shrink-0 border-l bg-slate-900 overflow-y-auto">
            <JsonViewer layout={layout} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
