# Layout Agent

A chat-based layout agent built with React, Vite, Node.js, Express, and Claude 3. This application allows users to modify design layouts through natural language conversations.

## Prerequisites

- Node.js v18+
- Anthropic API Key

## Setup Instructions

### 1. Backend Setup
\`\`\`bash
cd server
npm install
\`\`\`
- Edit \`server/.env\` and add your \`ANTHROPIC_API_KEY\`.
- Start the server:
\`\`\`bash
npm run dev
\`\`\`

### 2. Frontend Setup
In a new terminal:
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

## Features
- **Natural Language Interaction:** Chat with Claude to make layout changes (e.g. "Convert to 9:16").
- **Live Preview:** View changes via a real-time wireframe block preview.
- **State Viewer:** Watch the JSON state mutate as your instructions execute.
- **Contextual Awareness:** Refer back to prior elements across chats ("Make it bigger").
