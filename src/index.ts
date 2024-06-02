// 必要なパッケージをインポートする
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

import { onVoiceStateUpdate } from './vc_handler.js';
import { logger } from './utils/log.js';

// .envファイルを読み込む
dotenv.config();

/**
 * Discord Client
 */
export const client: Client = new Client({
  // Botで使うGetwayIntents、partials
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// -----------------------------------------------------------------------------------------------------------
// イベントハンドラーを登録する
// -----------------------------------------------------------------------------------------------------------
client.on(Events.ClientReady, () => {
  logger.info(`${client.user?.username ?? 'Unknown'} として起動しました!`);
});
client.on(
  Events.VoiceStateUpdate,
  (oldState, newState) => void onVoiceStateUpdate(oldState, newState),
);

// Discordにログインする
await client.login(process.env.DISCORD_TOKEN);
