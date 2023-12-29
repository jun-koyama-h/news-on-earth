* ライブラリのインストール
下記はすでに入れています。  
yarn add --dev wrangler  
yarn add --dev @cloudflare/ai  

```
cd api
yarn install
```

* Workersのデバッグ
これを実行すると、localhostでポート番号がコンソールに出ますのでcurlなどで単体テストは行えます。
```
yarn dev
```

* Workersのデプロイは下記ですが、GitHubActionsで自動デプロイします。
```
yarn deploy
```
