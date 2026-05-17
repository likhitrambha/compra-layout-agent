# Compra Chat-Based Layout Agent

A chat-driven design layout editor that allows users to modify a layout JSON using natural language instructions such as:

* "Convert this design to 9:16"
* "Move the headline to the top"
* "Make the headline smaller"
* "Keep the product large"

The application updates the layout JSON in real time and renders a wireframe preview of the design.

---

## 🚀 Live Features

### Frontend

* Chat interface built with React + Vite
* JSON viewer for the current layout
* Wireframe preview of the design
* Loading and error handling

### Backend

* Node.js + Express API
* Gemini API integration for layout reasoning
* JSON validation before applying updates
* Conversation history support for follow-up instructions

### Layout Operations Supported

* Aspect ratio conversion (1:1 → 9:16, 16:9, 4:5)
* Move elements (top, bottom, left, right, center)
* Resize text and shapes
* Change text color
* Follow-up commands using previous context

---

## 🛠️ Tech Stack

| Layer            | Technology         |
| ---------------- | ------------------ |
| Frontend         | React, Vite, Axios |
| Backend          | Node.js, Express   |
| LLM              | Google Gemini API  |
| Styling          | CSS                |
| State Management | React Hooks        |

---

## 📁 Project Structure

```text
compra-layout-agent/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── prompts/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── README.md
├── APPROACH.md
└── .gitignore
```

---

## ⚙️ Prerequisites

Before running the project, ensure you have:

* Node.js v18 or higher
* npm
* Google Gemini API key

Get a Gemini API key from:

[https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## 🔐 Environment Variables

Create a file named `server/.env` and add:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

> Do not commit your `.env` file to GitHub.

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/likhitrambha/compra-layout-agent.git
cd compra-layout-agent
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## ▶️ Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

Server runs at:

```text
http://localhost:3001
```

### Start the Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 💬 Example Prompts

Try these instructions in the chat:

* Convert this design to 9:16
* Keep the product large
* Move the headline to the top
* Move the offer badge higher
* Make the headline smaller
* Change the headline color to red
* Center the product
* Make the discount badge bigger

---

## 🧠 How It Works

1. The frontend loads an initial design JSON.
2. The user enters a natural language instruction.
3. The current layout and conversation history are sent to the backend.
4. Gemini interprets the request and returns an updated layout.
5. The backend validates the JSON response.
6. The frontend updates:

   * Chat messages
   * JSON viewer
   * Wireframe preview

---

## 🔄 Supported Aspect Ratios

| Ratio | Width | Height |
| ----- | ----: | -----: |
| 1:1   |  1080 |   1080 |
| 9:16  |  1080 |   1920 |
| 16:9  |  1920 |   1080 |
| 4:5   |  1080 |   1350 |

---

## 🧪 Testing Checklist

* [x] Initial layout loads
* [x] Chat interface works
* [x] JSON updates after each instruction
* [x] Wireframe preview updates
* [x] Aspect ratio conversion works
* [x] Follow-up prompts use context
* [x] Error handling for invalid responses

---

## 📌 Design Decisions

* Used Gemini for semantic understanding of layout elements.
* Preserved normalized coordinates (`nx`, `ny`, `nw`, `nh`) for reliable resizing.
* Added JSON validation to avoid applying malformed responses.
* Passed recent chat history to support contextual follow-up commands.

See `APPROACH.md` for a detailed explanation.

---

## ⚠️ Known Limitations

* Wireframe preview is approximate and does not render final graphics.
* Layout modifications depend on LLM output quality.
* API response times vary based on model performance.

---

## 🔮 Future Improvements

* Undo/redo support
* Export updated JSON
* Improved semantic role detection
* Final image rendering
* Multi-layout support

---

## 👨‍💻 Author

**Likhit Rambha**

GitHub: [https://github.com/likhitrambha](https://github.com/likhitrambha)

---

## 📎 Submission

Repository URL:

[https://github.com/likhitrambha/compra-layout-agent](https://github.com/likhitrambha/compra-layout-agent)

---

## 🙏 Thank You

Thank you for reviewing this submission. This project demonstrates frontend development, backend API integration, LLM-based reasoning, and safe JSON transformation.
