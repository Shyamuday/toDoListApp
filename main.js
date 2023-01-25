showtask();
let addTaskInput = document.getElementById("addTaskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let addTaskInputval;

addTaskBtn.addEventListener("click", function () {
  addTaskInputval = addTaskInput.value;
  if (addTaskInputval.trim() != 0) {
    let webtask = localStorage.getItem("showTask");
    if (webtask == null) {
      taskList = [];
    } else {
      taskList = JSON.parse(webtask);
    }
    taskList.push(addTaskInputval);
    localStorage.setItem("showTask", JSON.stringify(taskList));
    addTaskInput.value = "";
  }
  showtask();
});

function showtask() {
  let webtask = localStorage.getItem("showTask");
  if (webtask == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(webtask);
  }
  let tabelInnerData = "";
  let addedTaskList = document.getElementById("addedTaskList");
  taskList.forEach((item, index) => {
    tabelInnerData += ` <tr>
    <th scope="row">${index + 1}</th>
    <td class="tdItem">${item}</td>
    <td><button class="editbtn" onClick="editTask(${index})" >Edit</button></td>
    <td><button class="deletebtn" onClick="deleteItem(${index})" >Delete</button></td>
</tr>`;
  });
  addedTaskList.innerHTML = tabelInnerData;
}

function editTask(index) {
  let saveindex = document.getElementById("saveindex");
  let addTAskBtn = document.getElementById("addTaskBtn");
  let saveTaskBtn = document.getElementById("saveTaskBtn");
  saveindex.value = index;
  let webtask = localStorage.getItem("showTask");
  let taskList = JSON.parse(webtask);
  addTaskInput.value = taskList[index];
  addTAskBtn.style.display = "none";
  saveTaskBtn.style.display = "block";
}

let saveTaskBtn = document.getElementById("saveTaskBtn");
saveTaskBtn.addEventListener("click", function () {
  let webtask = localStorage.getItem("showTask");
  let taskList = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;
  taskList[saveindex] = addTaskInput.value;
  saveTaskBtn.style.display = "none";
  addTaskBtn.style.display = "block";
  localStorage.setItem("showTask", JSON.stringify(taskList));
  addTaskInput.value = "";
  showtask();
});

function deleteItem(index) {
  let webtask = localStorage.getItem("showTask");
  let taskList = JSON.parse(webtask);
  taskList.splice(index, 1);
  localStorage.setItem("showTask", JSON.stringify(taskList));
  showtask();
}

let deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener("click", function () {
  let saveTaskBtn = document.getElementById("saveTaskBtn");
  let addTaskBtn = document.getElementById("addTaskBtn");
  let webtask = localStorage.getItem("showTask");
  let taskList = JSON.parse(webtask);
  if (webtask == null) {
    taskList = [];
  } else {
    taskList = JSON.parse(webtask);
    taskList = [];
  }

  saveTaskBtn.style.display = "none";
  addTaskBtn.style.display = "block";
  localStorage.setItem("showTask", JSON.stringify(taskList));
  showtask();
});

let searchTextBox = document.getElementById("searchTextBox");
searchTextBox.addEventListener("input", function () {
  let trList = document.querySelectorAll("tr");
  Array.from(trList).forEach(function (item) {
    let serchedText = item.getElementsByTagName("td")[0].innerText;
    let searchTextBoxval = searchTextBox.value;
    let re = new RegExp(searchTextBoxval, "gi");
    if (serchedText.match(re)) {
      item.style.display = "table-row";
    } else {
      item.style.display = "none";
    }
  });
});