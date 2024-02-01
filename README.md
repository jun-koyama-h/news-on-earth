# News on Earth

## システム概要
日本語でキーワードを入力すると、そのキーワードはシステムの裏側で多言語に翻訳されます。その翻訳されたキーワードで世界各国のニュースメディアサイトの記事を検索し、結果を日本語で表示するというものになります。

## 経緯

世界中で起きているあらゆるニュースの真意をメディア・バイアスを回避したフラットな目線で把握し、その話題に関する独自の見解を持ちたい、という思いからになります。
ＳＮＳやメディアに様々な情報があふれている中で、世界はそのキーワードで何を報じているかを知ることができます。一次情報に近いことを知ることがグローバルな視点を持つきっかけになる、と考えます。

## 使用する技術

* 言語：JavaScript/TypeScript
* フレームワーク：React
* ソースコード共有：GitHub
* CI/CD：GitHub Actions
* サーバー：Cloudflare Pages
* サーバーレスJavaScript：Cloudflare Workers
* Web APIライブラリ：Hono
* テスティングフレームワーク：Jest
* データベース：Cloudflare Workers KV
* 翻訳API：Cloudflare Wokers AI
* サジェストAPI：Cloudflare Wokers AI
* 地図表示：React leaflet
* タスク管理：GitHub Projects
* IDE：GitHub Codespaces
* ニュース取得先API https://newsapi.org/

## 使用するメディア
|国|メディア名|APIが提供されているか|longitude latitude|
|---|---|---|---|
|日本|[NHK](https://www.nhk.or.jp/)|OK|35.71868658456217, 139.69505037724264|
|インド|[The Times of India](https://timesofindia.indiatimes.com/)|OK|28.567418741916896, 77.31810815767146|
|イスラエル|[ynet ידיעות אחרונות](https://www.ynet.co.il/home/0,7340,L-8,00.html) |NG only news.google.com|31.99320693688765, 34.75979254417867|
|ロシア|[Хибины.ru](https://www.interfax.ru/)|NG only news.google.com|58.210903398285495, 38.123876993151804|
|ウクライナ|[TCH](https://tsn.ua/)|OK|50.468862234391096, 30.504750457671477|
|イギリス|[BBC](https://www.bbc.com/)|OK|51.51908534419871, -0.1439736153429729|
|アメリカ|[CNN](https://edition.cnn.com/)|OK|40.588103341848054, -77.53671137416158|
|ドイツ|[SPIEGEL ONLINE](https://www.spiegel.de/politik/)|NG only news.google.com|53.54589604431986, 10.003963651648041|
|中国|[中国新聞網](https://www.chinanews.com/)|OK|39.925379280329466, 116.33750974281708|
|エジプト|[Al Youm Al Sabea](https://www.youm7.com/home/index)|NG only news.google.com|30.049263425756553, 31.210451457352463|
|キューバ|[Trabajadores](https://www.trabajadores.cu/)|NG|23.121388185987506, -82.38382042158497|
|トルコ|[Sözcü](https://www.sozcu.com.tr/)|NG only news.google.com|41.5304375907573, 29.065487235442973|

## 動作環境
[News on Earth](https://news-on-earth.pages.dev/)
