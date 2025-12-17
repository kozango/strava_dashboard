# Strava Dashboard

Stravaのアクティビティデータを可視化するダッシュボードアプリケーションです。

## 機能

- Strava OAuth認証
- アクティビティデータの取得と表示
- グラフィカルな統計情報の可視化
  - 距離の推移
  - アクティビティタイプ別の集計
  - 週間/月間の統計

## セットアップ

### 1. Strava APIの設定

1. [Strava API Settings](https://www.strava.com/settings/api) にアクセス
2. アプリケーションを作成
3. Authorization Callback Domain に `localhost` を設定
4. Client IDとClient Secretを取得

### 2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、取得した認証情報を設定してください。

```bash
cp .env.example .env.local
```

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 技術スタック

- Next.js 14
- TypeScript
- Recharts (グラフ表示)
- Strava API v3

## 使い方

1. アプリケーションを起動
2. 「Connect with Strava」ボタンをクリック
3. Stravaアカウントで認証
4. ダッシュボードでアクティビティデータを確認
