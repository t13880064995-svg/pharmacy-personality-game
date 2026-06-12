# GitHub Pages 发布步骤

由于发布到 GitHub Pages 需要你的 GitHub 账号权限，本项目已整理为可直接上传的静态网站。

## 方法一：网页上传，最简单

1. 打开 GitHub，创建一个新仓库，例如：`pharmacy-personality-game`
2. 上传本目录下全部文件：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `.nojekyll`
3. 进入仓库 `Settings` → `Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main`，Folder 选择 `/root`
6. 保存后等待 1-3 分钟
7. 公开链接格式：

```text
https://你的GitHub用户名.github.io/pharmacy-personality-game/
```

## 方法二：如果电脑已安装 Git

```bash
git init
git add .
git commit -m "Deploy pharmacy personality game"
git branch -M main
git remote add origin https://github.com/你的GitHub用户名/pharmacy-personality-game.git
git push -u origin main
```

然后在 GitHub 仓库设置里开启 Pages。

## 注意

排行榜使用浏览器 LocalStorage 保存，因此是每台设备本地真实玩家记录；不会生成模拟用户或假数据。
