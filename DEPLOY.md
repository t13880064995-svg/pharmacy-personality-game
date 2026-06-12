# GitHub Pages + Firebase 部署说明

本项目是纯前端静态网站，可以部署到 GitHub Pages。多人在线排行榜依赖 Firebase Firestore。

## 一、创建 Firebase 项目

1. 打开 [Firebase Console](https://console.firebase.google.com/)
2. 点击 `Add project` / `创建项目`
3. 输入项目名称，例如 `pharmacy-personality-game`
4. Google Analytics 可按需关闭
5. 创建完成后进入项目

## 二、创建 Web App

1. 在 Firebase 项目首页点击 Web 图标 `</>`
2. App nickname 填：`pharmacy-personality-game-web`
3. 不需要勾选 Firebase Hosting
4. 点击注册 App
5. 复制 Firebase 给出的 `firebaseConfig`
6. 打开本项目的 `firebase-config.js`
7. 替换里面的占位内容：

```js
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...firebaseapp.com",
  projectId: "...",
  storageBucket: "...appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

## 三、开启 Firestore

1. Firebase 左侧菜单进入 `Build` → `Firestore Database`
2. 点击 `Create database`
3. 模式选择 `Production mode` 或 `Test mode` 均可，后面会覆盖规则
4. 选择离用户近的区域，例如 asia-east1 / asia-northeast1
5. 创建数据库

## 四、配置 Firestore 安全规则

进入 Firestore 的 `Rules` 页面，把本项目 `firestore.rules` 的内容复制进去并发布。

规则含义：

- 所有人可以读取排行榜
- 玩家只能写入以自己 `playerId` 为文档 ID 的成绩记录
- 写入字段必须包含姓名、门店、积分、答题次数、正确率、连胜和称号等基础字段

## 五、配置授权域名

Firebase 默认允许 `localhost` 和 Firebase 域名。部署 GitHub Pages 后建议添加 GitHub Pages 域名：

1. Firebase 左侧进入 `Build` → `Authentication`
2. 如果没有启用 Auth，也可以在项目设置里找到授权域名区域
3. 添加：`你的GitHub用户名.github.io`

本项目不使用账号登录，但某些 Firebase Web 配置仍可能需要域名在授权范围内。

## 六、上传到 GitHub

1. 打开 GitHub 并登录
2. 创建新仓库，例如：`pharmacy-personality-game`
3. 选择 `Public`
4. 上传本目录全部文件：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `firebase-config.js`
   - `firestore.rules`
   - `README.md`
   - `DEPLOY.md`
   - `.nojekyll`
5. 点击 `Commit changes`

## 七、开启 GitHub Pages

1. 进入仓库 `Settings`
2. 左侧点击 `Pages`
3. Source 选择 `Deploy from a branch`
4. Branch 选择 `main`
5. Folder 选择 `/root`
6. 点击 `Save`
7. 等待 1-3 分钟

公开链接格式：

```text
https://你的GitHub用户名.github.io/pharmacy-personality-game/
```

## 八、验收检查

打开公开链接后检查：

1. 首页要求填写姓名和门店
2. 点击开始后进入三栏游戏页
3. 点击「生成今日顾客」
4. 完成答题后积分增加
5. AI 解析和店长秘籍自动出现
6. 右侧排行榜显示真实玩家
7. 多台设备打开同一链接，排行榜实时刷新
8. 个人榜、连胜榜、正确率榜、门店榜均可切换

## 九、常见问题

### 页面提示未配置 Firebase

说明 `firebase-config.js` 仍是占位内容。请重新粘贴 Firebase Web App 配置。

### 排行榜连接失败

重点检查：

- Firestore 是否已创建
- `firestore.rules` 是否发布
- `firebase-config.js` 的 `projectId` 是否正确
- GitHub Pages 域名是否允许访问

### 排行榜只有自己

可能是其他玩家还没有完成答题，或其他玩家访问的是不同 GitHub Pages 链接 / 不同 Firebase 项目。

### 手机布局异常

请确认浏览器访问的是最新 GitHub Pages 版本。GitHub Pages 有时有缓存，等待 1-3 分钟或强制刷新。
