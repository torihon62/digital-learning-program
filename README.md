# 学習プログラム（改）

## 環境整備

### Node.js のインストール

公式ページよりインストールをお願いいたします
https://nodejs.org/ja

#### 【参考】 Node.js インストール方法

- mac
  - https://zenn.dev/tn_a/articles/2487073812cb12#%E6%96%B9%E6%B3%952%3A-%E5%85%AC%E5%BC%8F%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%A9%E3%83%BC%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B
    - 方法 2 で行うのが簡単
- Windows
  - https://qiita.com/echolimitless/items/83f8658cf855de04b9ce

### 依存パッケージのインストール

Node.js をインストールすると、 `npm` というツールも同時に手に入ります。
作業ディレクトリを、本プロジェクトのルートにして、下記コマンドを実行してください。
（Windows であればコマンドプロンプト、Mac であればターミナルにて実行）

```
npm install
```

### 環境整備できたか確認

下記コマンドを実行してください。

```
npm run dev
```

ローカルサーバーが立ち上がりますので、ブラウザで[http://localhost:5173](http://localhost:5173/)にアクセスしてください。
画面が表示されれば成功です。

## 学習プログラムの追加方法

### sketch の追加

### trialData の追加

### 学習ページの追加

### sketch の作り込み

## 開発環境

React + Vite

### 構築手順

【前提】node v21 以上をインストール済み

```
npm i
npm run dev
```

### ビルド

```
npm run build
```

dist フォルダ内をホスティングサーバーにアップロードする
