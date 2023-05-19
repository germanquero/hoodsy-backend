const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(process.env.SLACK_WH);

function sendSlackNotification(error) {
    const message = {
      text: `An error has occurred on the server: ${error.message}`,
      icon_emoji: ':exclamation:',
      username: 'My API',
    };
  
    webhook.send(message)
      .then(() => {
        console.log('Message sent to Slack');
      })
      .catch((error) => {
        console.log('Error sending message to Slack:', error);
      });
  }
  

module.exports = sendSlackNotification