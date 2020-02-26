const Slack = require("node-slack");
const hook_url =
  
const slack = new Slack(hook_url);
module.exports = {
  sendMessage: function() {
    // set defaults if username or channel is not passed in
    var channel = "#general";
    var username = "(H)appy";
    var message = ":rotating_light: Looks like another app needs console-ing";
    // send the Slack message
    slack.send({
      text: message,
      channel: channel,
      username: username
    });
    return;
  }
};
