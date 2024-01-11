import e from 'express';
import UserQuery from './ai.js';
import mqtt from "mqtt";

const app = e();
const port = 3000;


let client = await mqtt.connect("mqtt://127.0.0.1", {clientId:"backend-server", username:"nodejs-server-1"});
client.on("connect", () => {
    console.log("Connected to mqtt server")
    client.subscribe("presence", (err) => {
      if (!err) {
        client.publish("presence", "Backend loggin in");
      }
    });
  });


function process(result) {
    let topics = result['changes'];
    let states = result['states'];
    if (topics.length == states.length) {
        var i = 0;
        for (;i<topics.length;i++) {
            client.publish(topics[i], states[i]);
        }
    } else {
        throw "Error in AI response";
    }
}

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
        console.log(response);
        const result = JSON.parse(response);
        process(result);
        res.send(result['message']);
    } catch (error) {
        res.status(500).send('Error processing your request\n' + error);
    }
});


// Route to handle '/commmand'
app.post('/command', async (req, res) => {
    const { topic, command } = req.body;

    if (!topic || !command) {
        return res.status(400).send('Both parameters are required');
    }

    try {
        const response = client.publish(topic, command);
        res.send("Check Mqtt server for response");
    } catch (error) {
        res.status(500).send('Error processing your request');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

