function sendMsg(){
    console.log('send');
// Twilio Credentials
    const accountSid = 'ACfe1b9bb3073c21d24eb8a0ba34d0708a';
    const authToken = 'c1caf0c048993a0964703b74ad2f9813';

// require the Twilio module and create a REST client
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        to: '+94716220786',
        from: '+13022519234',
        body: 'Your verification code is ' + Math.floor(1000 + Math.random() * 9000)
      })
      .then(message => console.log(message.sid));
    console.log('receive');
    console.log(Math.floor(1000 + Math.random() * 9000));
}

exports.sendMsg = sendMsg();

