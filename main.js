// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {

  // 入力したTodoタスクの一覧を保持する配列を定義する
  let toDos = [];

  // localStorageに保存する際のKey値を定義
  const STORE_KEY = 'storedList';

  // HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素

  const addedToDo = document.getElementById('input-todo-box');
  // ToDo追加時にクリックされるDOM
  const addedToDoButton = document.getElementById('add-button');

  const ulToDoList = document.getElementById('todo-list');

  const numberOfTasks = document.getElementById('numberOfTasks');

  //「追加」ボタンがクリックされたときの処理を実装する
  //   - テキストボックスに入力されたテキストをTodoリスト一覧に追加する
  //   - テキストボックスの中を空にする

  addedToDoButton.addEventListener('click', (event) => {
    if (!(addedToDo.value)) {
      alert('タスクを入力してください')
    } else {
      toDos.push(addedToDo.value);
      addedToDo.value = '';
      showToDos();
    }
  });

  // 「todos」の中身を一覧表示する
  //    - ul要素にli要素を追加して、li要素内にtodoタスクの内容を表示する
  //    - li要素内に削除ボタンを配置して、削除ボタンをクリックしたら対応するタスクを削除する

  const showToDos = function () {
    // 表示しているulToDoListの子要素を一旦削除する
    while (ulToDoList.firstChild) {
      ulToDoList.removeChild(ulToDoList.firstChild)
    }
    // toDos内の要素をHTMLに全て表示する
    toDos.forEach(function (item, index) {
      const liElementForToDo = document.createElement('li');
      liElementForToDo.id = index;
      const num = index + 1;
      liElementForToDo.innerText = `${num}  :  ${item}  `;
      ulToDoList.appendChild(liElementForToDo);

      // Todo情報を表すli要素(showTodo関数で作成される要素)の中にある削除ボタンをクリックしたら実行される。
      //   - todosから対応するtodo情報を削除する
      //   - 引数はindexを受け取る(インデックス番号)
      //   - 削除後はshowTodosを実行して、Todoリストを整理する
      const deleteToDoButton = document.createElement('button');
      deleteToDoButton.textContent = ' 削除 ';
      liElementForToDo.appendChild(deleteToDoButton);

      // 削除ボタンを押すとtoDdを削除する
      deleteToDoButton.addEventListener('click', (event) => {
        toDos.splice(index, 1);
        showToDos();
      });
    });

    // 残タスク数を表示
    showNumberOfTasks();

    // タスクを保存
    storedToLocalStorage(toDos);

  };

  // 残タスク数を表示する関数
  const showNumberOfTasks = function () {
    if (toDos.length === 0) {
      numberOfTasks.textContent = `現在、未完了のタスクはありません`;
    } else {
      numberOfTasks.textContent = `現在、未完了のタスクが${toDos.length}個あります`;
    }
  };

  // タスクをlocalstorageに保存する関数
  const storedToLocalStorage = function (array) {
    const jsonArray = JSON.stringify(array);
    localStorage.setItem(STORE_KEY, jsonArray);
  };

  // ページ読み込み時に保存されているToDoを読み込む処理

  window.onload = function () {

    const parseToDos = JSON.parse(localStorage.getItem(STORE_KEY));

    if (parseToDos) {
      toDos = parseToDos;
      showToDos();
    };
  };

})();
