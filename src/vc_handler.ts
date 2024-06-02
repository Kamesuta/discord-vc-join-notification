import { VoiceState } from 'discord.js';
import { config, webhookClient } from './utils/config.js';
import { logger } from './utils/log.js';

/**
 * クールダウン
 */
const lastLeave: Record<string, Date> = {};

/**
 * ボイスチャンネルの状態が変更されたときに呼び出されるイベントハンドラー
 * @param oldState 旧ボイスステート
 * @param newState 新ボイスステート
 */
export async function onVoiceStateUpdate(
  oldState: VoiceState,
  newState: VoiceState,
): Promise<void> {
  // ターゲットユーザーのメッセージを取得
  if (newState.member === null) return;
  const targetMessage = config.target_users[newState.member.id];
  // ターゲットユーザー以外は無視
  if (targetMessage === undefined) return;

  // クールダウンをチェック
  if (lastLeave[newState.member.id] !== undefined) {
    if (
      Date.now() - lastLeave[newState.member.id].getTime() <
      config.cooldown * 1000
    ) {
      return;
    }
  }
  // クールダウンを設定
  lastLeave[newState.member.id] = new Date();

  // 退出時は無視
  if (newState.channel === null) return;
  // 移動は無視
  if (oldState.channel !== null) return;

  // 参加チャンネル
  const joinedChannel = newState.channel;
  // 対象カテゴリーに所属していない場合は無視
  if (
    joinedChannel.parentId === null ||
    !config.category_ids.includes(joinedChannel.parentId)
  )
    return;
  // 無視チャンネルに所属している場合は無視
  if (config.ignore_channel_ids.includes(joinedChannel.id)) return;

  try {
    // Webhookを送信
    await webhookClient.send({
      content: targetMessage.replace(
        '{vc_link}',
        `https://discord.com/channels/${joinedChannel.guild.id}/${joinedChannel.id}`,
      ),
      username: newState.member.displayName,
      avatarURL: newState.member.user.displayAvatarURL(),
    });
  } catch (error) {
    logger.error('メッセージ送信エラー:', error);
  }
}
