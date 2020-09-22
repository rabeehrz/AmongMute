const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

client.login(config.BOT_TOKEN);

const prefix = '/';

let servers = {};

const getMuteState = (guildId, channelId) => {
  let guild = servers[guildId];
  if (guild) {
    if (guild[channelId]) {
      return guild[channelId];
    }
  } else {
    servers[guildId] = {};
  }
  servers[guildId][channelId] = false;
  return false;
};

client.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.channel.name !== 'amongmute') return;

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

      for (const [memberID, member] of channel.members) {
        member.voice.setMute(!muted);
      }

      message.reply(
        `You ${muted ? 'un' : ''}muted everyone in ${channel.name}`,
      );

      servers[guild.id][voiceChannel.id] = !muted;
    } else {
      message.reply('You need to join a voice channel first!');
    }
  } else return;
});

// Handle muting when getting in and out of server
client.on('voiceStateUpdate', (oldMember, newMember) => {
  const newChannelId = newMember.channelID;
  const oldChannelId = oldMember.channelID;
  if (oldChannelId !== newChannelId) {
    if (newChannelId) {
      newMember.member.voice.setMute(false);
      const guildId = newMember.guild.id;
      const channelId = newChannelId;
      if (servers[guildId] && servers[guildId][channelId] == true) {
        newMember.member.voice.setMute(true);
      }
    }
  }
});
