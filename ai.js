import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: 'OPENAI_API'});

//Assistant Introduction
 var prompt = "You are an industry management assistant with access to turning on or off machines that are listed below. You will be given a message by an authorised person to execute some changes in the states of machines. You have to read the message and return one json file in the format specified below. If you are unable to understand the message or any part of it. You have to return an error and not return any output.\n \n";


 //Info of the topics
 prompt += "\n These are the machines you will be working with:\n ";
 prompt += "bulb1: this is bulb right above arm1\n ";
 prompt += "bulb2: this is bulb in the office\n ";
 prompt += "arm1: this is an arm used in assembly.\n ";


 //Output Format
prompt += "\n Return output in Json format as given below. Do not give any other text.\n";
prompt += ' {"changes" : ["machine-name-1", "machine-name-2", ...],  "states" : ["on/off", "on/off", ...], "message": "your-message"} \n';
prompt += " Enter the machine names of the machines in the changes list, whose states is needed to be toggled. And enter the new state of the machines in the states list. \n";
prompt += " Replace your-message with error message in case or error or explain the changes and give success message in case of success.\n";
prompt += " Do not change the keys - changes, states and message. Only change the values in the output.\n";

// Function to handle communication with ChatGPT-3
async function UserQuery(message) {
    prompt += "\n Following is the message to be executed: \n" + message;
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
          });

        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error('Error calling ChatGPT-3 API:', error);
        throw error;
    }
}

export default UserQuery;