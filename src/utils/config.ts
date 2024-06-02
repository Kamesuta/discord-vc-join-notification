import assert from 'assert';
import { parse } from 'toml';
import { getWorkdirPath } from './workdir.js';
import { copyFileSync, existsSync, readFileSync } from 'fs';
import { WebhookClient } from 'discord.js';

/**
 * 設定ファイルの構造
 */
export interface Config {
  /*
   * 設定名はスネークケースで書くべきです。そのため、ここではESLintの命名ルールを無効にしています。
   * 'requiresQuotes'ルールは、クォートで囲む必要がある文字列（スペースを含む）のみを除外するため、ここでは無効にしています。
   */
  /* eslint-disable @typescript-eslint/naming-convention */

  /** サーバーID */
  category_ids: string[];
  /** 無視チャンネルID */
  ignore_channel_ids: string[];
  /** 対象ユーザー */
  target_users: Record<string, string>;
  /** 送信チャンネル Webhook */
  send_channel_webhook: string;
  /** クールダウン */
  cooldown: number;

  /* eslint-enable @typescript-eslint/naming-convention */
}

// もしconfig.tomlが存在しない場合、config.default.tomlをコピーする
if (!existsSync(getWorkdirPath('config.toml'))) {
  copyFileSync(
    getWorkdirPath('config.default.toml'),
    getWorkdirPath('config.toml'),
  );
}

/** 設定 */
export const config: Config = parse(
  readFileSync(getWorkdirPath('config.toml'), 'utf-8'),
) as Config;

// タイプをチェックする
assert(
  config.category_ids && Array.isArray(config.category_ids),
  'category_idsは必須で、配列である必要があります。',
);
assert(
  config.ignore_channel_ids && Array.isArray(config.ignore_channel_ids),
  'ignore_channel_idsは必須で、配列である必要があります。',
);
assert(
  config.target_users && typeof config.target_users === 'object',
  'target_usersは必須で、オブジェクトである必要があります。',
);
assert(
  typeof config.send_channel_webhook === 'string',
  'send_channel_webhookは文字列である必要があります。',
);
assert(
  typeof config.cooldown === 'number',
  'cooldownは必須で、数値である必要があります。',
);

// Webhook URLのパース
const match = /\/webhooks\/(\d+)\/(.+)/.exec(config.send_channel_webhook);
assert(match, 'Webhook URLが不正です');
/**
 * URLからWebhookClientを生成
 */
export const webhookClient = new WebhookClient({
  id: match[1],
  token: match[2],
});
