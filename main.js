// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {
  // 入力したTodoタスクの一覧を保持する配列を定義する
  const toDos = [];

  console.log(toDos);

  // HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素

  const addedToDo = document.getElementById('input-todo-box');
  // ToDo追加時にクリックされるDOM
  const addedToDoButton = document.getElementById('add-button');

  const ulToDoList = document.getElementById('todo-list');

  //「追加」ボタンがクリックされたときの処理を実装する
  //   - テキストボックスに入力されたテキストをTodoリスト一覧に追加する
  //   - テキストボックスの中を空にする

  addedToDoButton.addEventListener('click', (event) => {
    toDos.push(addedToDo.value);
    addedToDo.value = '';
    console.log('追加をクリック', event);
    console.log(toDos);
    showToDos();
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
      const num = index + 1;
      liElementForToDo.innerHTML = num + ' : ' + item + '  <input type="button" class="delete-toDo" value="削除"> ';
      liElementForToDo.id = index;
      ulToDoList.appendChild(liElementForToDo);
    })
  };


  // Todo情報を表すli要素(showTodo関数で作成される要素)の中にある削除ボタンをクリックしたら実行される。
  //   - todosから対応するtodo情報を削除する
  //   - 引数はindexを受け取る(インデックス番号)
  //   - 削除後はshowTodosを実行して、Todoリストを整理する

  // 削除ボタンのDOM取得
  const deleteButton = document.getElementById('delete-toDo-button');

  // 削除するToDoのDOMを取得
  const deletedToDo = document.getElementById(index);

  // 削除ボタンを押した時の処理を実装
  deleteButton.addEventListener(click, (event => {


    showToDos();
  }));

})();