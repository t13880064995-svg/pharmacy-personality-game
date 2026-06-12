# GitHub Pages + Firebase Realtime Database 部署说明

本项目是纯前端静态网站，可以部署到 GitHub Pages。多人在线排行榜依赖 Firebase Realtime Database，不使用 Firestore。

## 一、Firebase 已完成项

你需要完成：

1. 创建 Firebase 项目
2. 创建 Web App 并填写 `firebase-config.js`
3. 创建 Realtime Database
4. 把 Realtime Database 地址填入 `databaseURL`
5. 发布 `database.rules.json` 里的规则

## 二、上传到 GitHub

1. 打开 [GitHub](https://github.com/) 并登录账号 `t13880064995-svg`
2. 右上角点击 `+`
3. 点击 `New repository`
4. 仓库名填写：`pharmacy-personality-game`
5. 选择 `Public`
6. 点击 `Create repository`
7. 在新仓库页面点击 `uploading an existing file`
8. 上传本目录全部文件：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `firebase-config.js`
   - `database.rules.json`
   - `README.md`
   - `DEPLOY.md`
   - `.nojekyll`
9. 点击 `Commit changes`

注意：不要上传 `pharmacy-personality-game.zip`，要上传解压后的文件。

## 三、开启 GitHub Pages

1. 进入仓库 `Settings`
2. 左侧点击 `Pages`
3. Source 选择 `Deploy from a branch`
4. Branch 选择 `main`
5. Folder 选择 `/root`
6. 点击 `Save`
7. 等待 1-3 分钟

公开链接：

```text
https://t13880064995-svg.github.io/pharmacy-personality-game/
```

## 四、验收检查

打开公开链接后检查：

1. 首页要求填写姓名和门店
2. 点击开始后进入三栏游戏页
3. 点击「随机生成顾客」
4. 完成答题后积分增加
5. AI 解析和店长秘籍自动出现
6. 右侧排行榜显示真实玩家
7. 多台设备打开同一链接，排行榜实时刷新
8. 个人榜、连胜榜、正确率榜、门店榜均可切换

## 五、常见问题

### 页面提示未配置 Firebase

说明 `firebase-config.js` 仍有 `PASTE_` 占位内容，尤其检查 `databaseURL`。

### 排行榜连接失败

重点检查：

- Realtime Database 是否创建成功
- `firebase-config.js` 是否有正确的 `databaseURL`
- `database.rules.json` 是否已经发布到 Realtime Database 的 Rules
- GitHub Pages 是否上传了最新的 `firebase-config.js` 和 `app.js`

### 答题后不显示解析

请确认上传的是最新 `app.js`。新版已改为先显示解析和店长秘籍，再异步同步排行榜。

