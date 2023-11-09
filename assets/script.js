var globalData = [];

function getItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
      globalData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    generateItems(items);
  });
}

function generateItems(items) {
  let todoItems = [];
  // items.sort((a, b) => new Date(b.date) - new Date(a.date));
  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");
    let checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");
    checkMark.innerHTML = '<img src="assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
    });
    checkContainer.appendChild(checkMark);

    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = item.text;

    if (item.status == "completed") {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    }
    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItems.push(todoItem);
  });
  document.querySelector(".todo-items").replaceChildren(...todoItems);
}

function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  let newItem = db.collection("todo-items").add({
    text: text.value,
    status: "active",
  });
  text.value = "";
}

function markCompleted(id) {
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().status == "active") {
        item.update({
          status: "completed",
        });
      } else {
        item.update({
          status: "active",
        });
      }
    }
  });
}

getItems();

function deleteAll() {
  globalData.forEach((data) => {
    if (data.status === "completed") {
      db.collection("todo-items").doc(data.id).delete();
    }
  });
}

function deleteFull() {
  globalData.forEach((data) => {
    db.collection("todo-items").doc(data.id).delete();
  });
}

console.log(globalData);

// function counter() {
//   console.log("the counter function");
//   var count = 0;
//   globalData.forEach(() => {
//     count++;
//     console.log("count");
//   });

//   var newParagraph = document.createElement("div");
//   newParagraph.className = "items-clear";
//   newParagraph.appendChild(document.createTextNode("i am a new text node."));
//   document.getElementById("countItems").appendChild(newParagraph);

//   var element = document.querySelector("todo-items-info");
//   var count = document.createElement("div");
//   count.classList.add("items-clear");
//   var span = document.createElement("span");
//   span.innerHTML = `${count} Items Left`;
//   count.appendChild(span);

//   element.appendChild(count);
// }

// counter();
