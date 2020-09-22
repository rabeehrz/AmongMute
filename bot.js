const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

const prefix = '/';

let muted = false;

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.channel.name !== 'mutebot') return;

  console.log(message);

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'pong') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === 'tmc') {
    if (message.member.voice.channel) {
      let channel = message.guild.channels.cache.get(
        message.member.voice.channel.id,
      );

      for (const [memberID, member] of channel.members) {
        member.voice.setMute(!muted);
      }
      message.reply(
        `You ${muted ? 'un' : ''}muted everyone in ${channel.name}`,
      );
      muted = !muted;
    } else {
      message.reply('You need to join a voice channel first!');
    }
  } else return;
});

client.login(config.BOT_TOKEN);
