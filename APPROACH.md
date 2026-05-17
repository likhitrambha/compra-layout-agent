# Approach Note

This project implements a chat-based layout AI agent. Below is an overview of the approach and specific implementation decisions:

## 1. System Prompt & LLM Structure
The core intelligence of the agent lies in `systemPrompt.js`. The prompt provides strict rules on how coordinates work (absolute vs normalized). It introduces Claude to the semantic roles within the layout based on `data.content` and node names (e.g., Background, Product, offer badge). To guarantee valid json responses, the prompt enforces a rigid output schema using JSON without markdown blocks.

## 2. Conversation Context
To handle follow-up instructions ("Make the headline smaller", followed by "Make it blue"), the React hook (`useLayoutAgent.js`) stores chat history. The last 6 messages are forwarded to the server alongside the current layout JSON. The backend concatenates this into Anthropic's expected messages array. 

## 3. JSON Transformations
Instead of just sending abstract commands, the LLM takes the full layout and modifies it directly. While deterministic functions (like resizing an artboard) *could* be enforced by code logic alone, having the LLM do it forces it to adhere strictly to updating normalized properties alongside absolute properties. 
If the LLM makes a structural error, `jsonValidator.js` catches it before sending a malformed object to the frontend.

## 4. Frontend Wireframe
We use a CSS-based absolute-positioned `WireframePreview`. It maps properties from the updated JSON `(nx, ny, nw, nh)` into percentage styles `(left, top, width, height)`. This ensures that artboard resizing correctly re-renders the children's dimensions in real-time.

## Trade-offs and Future Improvements
- **Security / Payload Size:** The full JSON layout is sent over the wire on every chat. For larger designs (e.g., deep Figma trees), it would be better to keep the master JSON on the server and use the LLM to emit deterministic "actions/patches" (e.g., `{ action: "RESIZE_NODE", nodeId: "...", payload: { nw: 0.5 } }`).
- **Math Capabilities:** LLMs are known to hallucinate arithmetic. For simple absolute to normalized calculations, it's okay, but for complex aspect ratio crop adjustments, deterministic helper functions on the backend are significantly more reliable.
