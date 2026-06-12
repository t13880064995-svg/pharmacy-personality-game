// Firebase Web SDK 配置
// 请把 Firebase 控制台中 const firebaseConfig = { ... } 里的真实值复制到这里。
// 注意：不要复制 npm install firebase，也不要复制 initializeApp 代码。
export const firebaseConfig = {
  apiKey: "AIzaSyCIgU9P7EI_5_shhcuJvpO4qbDlsAR1TVI",
  authDomain: "pharmacy-personality-game.firebaseapp.com",
  projectId: "pharmacy-personality-game",
  databaseURL: "https://pharmacy-personality-game-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "pharmacy-personality-game.firebasestorage.app",
  messagingSenderId: "61205560483",
  appId: "1:61205560483:web:d3c0a90d8ad4e2d4ef9316"
};

export const firebaseReady =
  !firebaseConfig.apiKey.includes("PASTE_") &&
  !firebaseConfig.projectId.includes("PASTE_") &&
  !firebaseConfig.appId.includes("PASTE_") &&
  !firebaseConfig.databaseURL.includes("PASTE_");

