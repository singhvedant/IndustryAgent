import e from 'express';
import UserQuery from './ai.js';
const app = e();
const port = 3000;

// Middleware to parse JSON body
app.use(e.json());

// Route to handle '/agent'
app.post('/agent', async (req, res) => {
    const { msg } = req.body;

    if (!msg) {
        return res.status(400).send('Message parameter is required');
    }

    try {
        const response = await UserQuery(msg);
        res.send(response);
    } catch (error) {
        res.status(500).send('Error processing your request');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

