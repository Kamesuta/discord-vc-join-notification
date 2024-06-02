# discord-vc-join-notification

特定の誰かがVCに入ったらテキストチャットで通知します

## 使い方

1. `config.default.toml`を`config.toml`にコピーして中身を編集します

    ```toml
    # サーバーID
    category_ids = ["000000000000000000"]

    # 無視チャンネルID
    ignore_channel_ids = ["000000000000000000"]

    # 送信チャンネル Webhook
    send_channel_webhook = "https://discord.com/api/webhooks/000000000000000000/AbCdEfGhIjKlMnOpQrStUvWxYz1234567890"

    # クールダウン (秒)
    cooldown = 30

    # 対象ユーザー
    [target_users]
    "000000000000000000" = "<&@000000000000000000> 〇〇がVCに参加しました！"
    ```

2. `.env.sample`を`.env`にコピーして中身にトークンを記述します
3. `npm install`で依存関係をインストールします
4. `npm run start`で起動します
