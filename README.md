
# Personal Time Management Assistant (Gemini 2.5 Chatbot)

A simple, web-based personal assistant combining a conversational AI chatbot (powered by Google Gemini 2.5) with time management features. Plan your day, get productivity tips, and manage your schedule directly via chat.

## Features

- Conversational AI assistant (Gemini 2.5) for productivity and time management
- Fast, responsive web UI (HTML, CSS, JavaScript)
- Smart parsing and display of AI replies (supports Markdown formatting)
- Simple, modern design with easy customization

## Demo

<!-- (replace with your own screenshot if available) -->

## Getting Started

### Prerequisites

- Google Gemini API key ([Get one here](https://ai.google.dev/docs/api-key))
- Local server to serve HTML files (e.g., Python, VSCode Live Server, etc.)

### Installation

1. **Clone this repository**

    ```
    git clone https://github.com/its-nabhya/Personal_Time_Manager.git
    cd Personal_Time_Manager
    ```

2. **Add Your API Key**

    - Open `script.js`
    - Replace `YOUR_API_KEY` with your Gemini API key:

    ```
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=ENTER_YOUR_GEMINI_API_KEY';
    ```

3. **Run a Local Server**

    - With Python:

    ```
    python -m http.server 5500
    ```

    Then open [http://localhost:5500](http://localhost:5500) in your browser.

    - Or use the VSCode Live Server extension.

## Usage

- Open the web app in your browser.
- Type questions or scheduling requests into the chat.
- The AI will respond with advice, plans, and reminders in natural language.

## Skills Demonstrated

- Async JavaScript & Fetch API  
- JSON parsing & DOM manipulation  
- Markdown rendering in the frontend  
- Responsive UI (HTML/CSS)  
- Secure API usage  
- Conversational UI logic  
- AI/LLM API integration  

## Configuration & Customization

- Edit styles in `style.css` to change appearance.
- Extend bot logic or connect to calendar APIs in `script.js`.
- Replace the demo screenshot with your own.

## Security Notes

**Do not deploy with your API key exposed publicly.**  
For production, use a backend to keep credentials secure.

## License

MIT License 

Copyright (c) 2025 Nabhya Parsramka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements

- [Google Gemini API](https://ai.google.dev/)  
- [marked.js](https://marked.js.org/) for Markdown parsing

