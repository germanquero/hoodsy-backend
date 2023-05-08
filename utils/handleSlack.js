const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook('https://hooks.slack.com/services/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'); // Reemplaza TOKEN y ID con tu información

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
        console.error('Error sending message to Slack:', error);
      });
  }
  

module.exports = sendSlackNotification