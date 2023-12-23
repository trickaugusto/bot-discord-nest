import { IntentsBitField } from 'discord.js';

export const environment = {
  production: false,
  discord: {
    token: 'DISCORD_BOT_TOKEN',
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.DirectMessages,
    ],
  },
};
