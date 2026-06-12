# 顾客人格解锁：今天药房来了谁？

面向全国药房员工的轻量化 AI 互动小游戏。员工通过识别顾客人格，训练顾客洞察、服务沟通、会员推荐和销售成交能力。

## 当前版本

多人在线排行榜版，适合部署到 GitHub Pages。

## 核心功能

- 登录页填写真实姓名和门店，例如：`北京丰桥路店`
- 57 个真实药房场景顾客
- 识别顾客人格答题
- 积分、答题次数、正确次数、正确率、连胜次数
- 称号系统：新手观察员、顾客观察员、门店洞察达人、金牌服务官、精准洞察师、连胜战神、顾客读心王
- Firebase Realtime Database 存储玩家成绩
- 所有玩家共享同一排行榜
- 排行榜实时刷新
- 个人榜、连胜榜、正确率榜、门店榜
- 移动端和电脑端自适应
- GitHub Pages 静态部署

## 文件结构

```text
pharmacy-personality-game/
├── index.html
├── styles.css
├── app.js
├── firebase-config.js
├── database.rules.json
├── README.md
├── DEPLOY.md
└── .nojekyll
```

## 本地预览

由于本项目使用 ES Module，建议用本地静态服务器打开，而不是直接双击 HTML。
部署到 GitHub Pages 后，手机和电脑直接访问同一个公开链接即可。

## 数据说明

- 玩家本机保存一份 LocalStorage 数据，保证临时离线也能显示自己的成绩。
- 配置 Firebase 后，成绩会同步到 Realtime Database 的 `players` 节点。
- 排行榜只读取真实玩家提交的记录，不生成任何模拟用户或假数据。
- 门店榜按所有同门店玩家总积分聚合展示。

## Firebase 配置文件

请编辑 `firebase-config.js`，确保包含 `databaseURL`：

```js
export const firebaseConfig = {
  apiKey: "你的 apiKey",
  authDomain: "你的项目.firebaseapp.com",
  projectId: "你的项目ID",
  databaseURL: "你的 Realtime Database 地址",
  storageBucket: "你的项目.appspot.com",
  messagingSenderId: "你的 senderId",
  appId: "你的 appId"
};
```

配置完成后，页面会显示在线排行榜已连接。
