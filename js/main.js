import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  remove,
  onChildRemoved,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: ,
  authDomain: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId: ,
  appId: ,
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, "chat"); //RealtimeDB内の"chat"を使う

// たぬき
$(function () {
  $("#tanuki").click(function () {
    // 音を鳴らす
    $("#seSelect")[0].play();
    $("#overlayTanuki").fadeIn(); /*ふわっと表示*/
  });
  //データ登録(Click)
  $("#sendTanuki").on("click", function () {
    const msg = {
      uname: "たぬき",
      text: $("#textTanuki").val(),
    };
    $("#overlayTanuki").fadeOut(); /*ふわっと消える*/
    // 入力欄を空欄にする（クリア）
    $("#textTanuki").val("");
    console.log(msg);
    const newPostRef = push(dbRef); //ユニークKEYを生成
    set(newPostRef, msg); //"chat"にユニークKEYをつけてオブジェクトデータを登録
    // 音を鳴らす
    $("#seSwipe")[0].play();
  });
});

// きつね
$(function () {
  $("#kitsune").click(function () {
    // 音を鳴らす
    $("#seSelect")[0].play();
    $("#overlayKitsune").fadeIn(); /*ふわっと表示*/
  });
  //データ登録(Click)
  $("#sendKitsune").on("click", function () {
    const msg = {
      uname: "きつね",
      text: $("#textKitsune").val(),
    };
    $("#overlayKitsune").fadeOut(); /*ふわっと消える*/
    // 入力欄を空欄にする（クリア）
    $("#textKitsune").val("");
    console.log(msg);
    const newPostRef = push(dbRef); //ユニークKEYを生成
    set(newPostRef, msg); //"chat"にユニークKEYをつけてオブジェクトデータを登録
    // 音を鳴らす
    $("#seSwipe")[0].play();
  });
});

//最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
onChildAdded(dbRef, function (data) {
  const msg = data.val(); //オブジェクトデータを取得し、変数msgに代入
  const key = data.key; //データのユニークキー（削除や更新に使用可能）
  //表示用テキスト・HTMLを作成
  let h;
  if (msg.uname === "たぬき") {
    h = `
        <div id="${key}" class="balloonTanuki">
        <img src="./img/raccoon.png" alt="ユーザーアイコン" class="icon" />
        <div>
          <p class="name">${msg.uname}</p>
          <p class="text">${msg.text}</p>
        </div>
      </div>
        `;
  } else if (msg.uname === "きつね") {
    h = `
        <div id="${key}" class="balloonKitsune">
        <div>
          <p class="name">${msg.uname}</p>
          <p class="text">${msg.text}</p>
        </div>
        <img src="./img/fox.png" alt="ユーザーアイコン" class="iconKitsune" />
      </div>
        `;
  }
  // jQueryを使って画面に表示する
  $("#output").append(h);
});
