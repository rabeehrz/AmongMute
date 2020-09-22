# AmongMute

A simple discord bot that mutes everyone in current voice channel.

Feel free to contribute and stuff.

[Add to Discord](https://discord.com/api/oauth2/authorize?client_id=757861746265292840&permissions=4194304&scope=bot)

Create a new text channel called `amongmute` and then type /tm to toggle mute and unmute in voice channel.

Also try /pong for pinging.

##### NOTE: I can't guarantee 100% uptime of the bot. Try to follow the instruction below and set up your own bot.

## Instructions for setting up your own bot

Read this to get your token. This is better: https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js

- Make sure you have Node.js installed.
- Create a new bot in Discord Developer Dashboard with Mute permissions.
- Copy the bot token and add the bot in your discord.
- Clone the repo.
- rename config.sample.json to config.json.
- Update your bot token in config.json.

  ```json
  {
    "BOT_TOKEN": "BOT_TOKEN"
  }
  ```

- Start the bot

  ```bash
  npm start
  ```

- Go to your Discord and create a text channel called amongmute.
- Join a VC and type /tm.
