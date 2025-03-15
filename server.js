const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for conversation history
let conversationHistory = [];

// Define a GET route for the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});

// Define a POST route for tax-related prompts
app.post('/api/tax-prompt', (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Invalid or unsupported tax query.' });
    }

    // Predefined tax-related responses
    const taxResponses = {
        "hi": "Hello! How can I assist you with your tax-related queries?",
        "how to file tax": "To file your taxes, you need to gather all necessary documents such as W-2 forms, 1099s, receipts, and other financial records. Then, use IRS-approved software or consult a tax professional to fill out the appropriate forms. Don't forget to review your return before submitting it.",
        // Add more predefined responses here
    };

    const response = taxResponses[prompt.toLowerCase()] || "I'm sorry, I don't have an answer for that.";

    // Add the question and response to the conversation history
    conversationHistory.push({ question: prompt, answer: response });

    // Send the full conversation history back to the client
    res.json({ conversationHistory });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});