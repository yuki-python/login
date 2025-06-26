# 1. ベースイメージを指定 (軽量なNode.jsイメージを利用)
FROM node:16-alpine as build-stage

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 4. 必要な依存関係をインストール
RUN npm install

# 5. ソースコードをコピー
COPY . .

# 6. Vueアプリをビルド
RUN npm run build

# 7. 実行環境を指定
FROM nginx:1.19-alpine as production-stage

# 8. 作業ディレクトリを設定
WORKDIR /usr/share/nginx/html

# 9. ビルド済みのファイルをコピー
COPY --from=build-stage /app/dist ./

# 10. Nginxのデフォルト設定を削除
RUN rm /etc/nginx/conf.d/default.conf

# 11. カスタムNginx設定を追加
COPY nginx.conf /etc/nginx/conf.d

# 12. コンテナ起動時のデフォルトコマンドを指定
CMD ["nginx", "-g", "daemon off;"]
