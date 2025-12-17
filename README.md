# Strava Dashboard

あなたのStravaデータを美しく可視化するダッシュボードアプリケーション

![Strava Dashboard](https://img.shields.io/badge/Strava-FC4C02?style=for-the-badge&logo=strava&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 機能

- 🔐 Strava OAuth認証
- 🏃 アクティビティタイプでフィルタリング
  - 自転車、ランニング、トレイルランニング、登山など
  - タイプごとのアクティビティ数を表示
  - フィルター選択で統計とグラフを動的に更新
- 🗺️ 地図でルート表示
  - アクティビティのルートを地図上に線で表示
  - スポーツタイプごとに色分け
  - ポップアップで詳細情報を表示
- 📊 アクティビティ統計の表示
  - 総アクティビティ数
  - 総距離
  - 総時間
  - 平均速度
- 📈 グラフによるデータ可視化
  - 距離の推移
  - 速度と獲得標高の推移
- 📱 レスポンシブデザイン
- 🎨 モダンなUI（Tailwind CSS使用）

## セットアップ

### 1. Strava APIの設定

1. [Strava API設定ページ](https://www.strava.com/settings/api)にアクセス
2. "Create an App"をクリック
3. アプリケーション情報を入力:
   - **Application Name**: 任意の名前
   - **Category**: 任意のカテゴリー
   - **Club**: 空欄でOK
   - **Website**: `http://localhost:3000`
   - **Authorization Callback Domain**: `localhost`
4. Client IDとClient Secretをメモ

### 2. プロジェクトのセットアップ

```bash
# 依存関係のインストール
npm install

# 環境変数ファイルの作成
cp .env.example .env
```

### 3. 環境変数の設定

`.env`ファイルを編集して、Strava APIの認証情報を設定:

```env
VITE_STRAVA_CLIENT_ID=your_client_id_here
VITE_STRAVA_CLIENT_SECRET=your_client_secret_here
VITE_STRAVA_REDIRECT_URI=http://localhost:3000/callback
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 使い方

1. 「Stravaで認証」ボタンをクリック
2. Stravaのログイン画面で認証
3. ダッシュボードでデータを確認

## ビルド

```bash
# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **グラフ**: Recharts
- **地図**: Leaflet + React Leaflet
- **HTTP クライアント**: Axios
- **API**: Strava API v3

## プロジェクト構造

```
strava_dashboard/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── Login.tsx       # ログイン画面
│   │   ├── Dashboard.tsx   # メインダッシュボード
│   │   ├── StatsCard.tsx   # 統計カード
│   │   ├── ActivityChart.tsx # グラフコンポーネント
│   │   ├── ActivityFilter.tsx # アクティビティフィルター
│   │   └── ActivityMap.tsx # 地図コンポーネント
│   ├── hooks/              # カスタムフック
│   │   └── useStravaAuth.ts # 認証フック
│   ├── services/           # API関連
│   │   └── stravaApi.ts    # Strava APIクライアント
│   ├── types/              # TypeScript型定義
│   │   └── strava.ts       # Strava関連の型
│   ├── App.tsx             # メインアプリケーション
│   ├── main.tsx            # エントリーポイント
│   ├── vite-env.d.ts       # Vite環境変数型定義
│   └── index.css           # グローバルスタイル
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 取得できるデータ

- アクティビティ名
- アクティビティタイプ（ラン、ライド、スイムなど）
- 距離
- 時間（移動時間、経過時間）
- 速度（平均速度、最高速度）
- 獲得標高
- 心拍数（利用可能な場合）
- Kudos数

## 注意事項

- Strava APIには[レート制限](https://developers.strava.com/docs/rate-limits/)があります
  - 15分ごとに600リクエスト
  - 1日あたり30,000リクエスト
- このアプリケーションはデモ用です。本番環境で使用する場合は、セキュリティ対策を強化してください
- トークンはlocalStorageに保存されます。より安全な保存方法を検討してください

## ライセンス

MIT

## 開発者

作成者: あなた

## 参考リンク

- [Strava API Documentation](https://developers.strava.com/docs/reference/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Recharts Documentation](https://recharts.org/)
