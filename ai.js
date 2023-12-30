import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: 'OPENAI_API_KEY'});

// Function to handle communication with ChatGPT-3
async function UserQuery(message) {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
          });

        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('Error calling ChatGPT-3 API:', error);
        throw error;
    }
}

export default UserQuery;