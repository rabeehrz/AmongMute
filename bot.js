const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

const prefix = '/';

let servers = {};

const getMuteState = (guildId, channelID) => {
  let guild = servers[guildId];
  if (guild) {
    if (guild[channelID]) {
      return guild[channelID];
    }
  }
  servers[guildId] = {};
  servers[guildId][channelID] = false;
  return false;
};

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.channel.name !== 'mutebot') return;

  const guild = message.guild;
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'pong') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  } else if (command === 'tm') {
    const voiceChannel = message.member.voice.channel;

    if (voiceChannel) {
      const muted = getMuteState(guild.id, voiceChannel.id);
      const channel = guild.channels.cache.get(voiceChannel.id);
      console.log(channel);

      for (const [memberID, member] of channel.members) {
        member.voice.setMute(!muted);
      }

      message.reply(
        `You ${muted ? 'un' : ''}muted everyone in ${channel.name}`,
      );
      console.log(servers);
      servers[guild.id][voiceChannel.id] = !muted;
    } else {
      message.reply('You need to join a voice channel first!');
    }
  } else return;
});

client.login(config.BOT_TOKEN);
