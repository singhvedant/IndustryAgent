# Setting up The project
- git clone this repository
- Change the API key
- Download and Start EMQX Local server
- run 'npm install'
- run 'npm start'
- Open the Unreal Application and test

## EMQX MQTT Broker Connection info:
Protocol: mqtt://

Host: 127.0.0.1 or localhost or your IP Address

PORT: 1883

ClientID: Use a unique ID {virtual-environment} {backend-server} {monitor}

UserName: Make an Identifier from adding nummber in clientID {monitor1} {backend-server-3}

Password: Leave empty or don't invoke

## Setting UP OpenAI_API
Put your API key in ai.js 

Or I will add a dot-env thing soon

## API Reference
### Agent
endpoint : http://localhost:3000/agent

Headers : Content-Type: application/json 

Body Parameters : msg (string, required)

### Command
endpoint : http://localhost:3000/command

Headers : Content-Type: application/json 

Body Parameters : 
- topic (string, required)
- command (string, required)


# Setting up MQTT Broker

### Dowmload EMQX Desktop Client (Optional)
https://mqttx.app/
Connect Client this way:
https://mqttx.app/docs/get-started

### Download EMQX
https://www.emqx.io/downloads

### Open EMQX Management server
Start your web browser and enter http://localhost:18083/ (localhost can be substituted with your IP address) in the address bar to access the EMQX Dashboard, from where you can connect to your clients or check the running status

Default user name and password:

Username : admin

password : public

Reset the password after logging in for the first time
