// variables
let tasksContent = JSON.parse(localStorage.getItem("tasksContent")) || [];
let newTaskInfo = document.getElementById("newTask");
let newTaskdeadLine = document.getElementById("newTaskdeadLine");
let formCotrol = "submit";
let rowUpdatedIndex = "";
let taskRow = document.getElementsByClassName("taskRow");
let progressBar = document.getElementById("progressBar");
// Read
function display() {
  let tasksContainer = document.getElementById("tasksContainer");
  let task = "";
  let complet = 0;
  tasksContent.forEach((element, i) => {
    if (element.isDone === "true") {
      complet++;
    }
    task += `
     <div class="row my-1 p-1 rounded-5 shadow taskRow ${
       element.isDone === "true" ? "taskDone" : "taskRow "
     }" >
                  <div
                    class="col-md-7 col-4 d-flex flex-column justify-content-between"
                  >

                    <p class="fw-medium">${element.taskInfo}</p>
                    <p class="mb-0 ">
                      <i class="fa-solid fa-calendar-days"></i>
                      <span class="date">${element.taskDate}</span>
                    </p>
                  </div>
                    <div
                    class="col-md-2 col-3 n"
                  >
                    <p class="fw-medium">DeadLine</p>
                    <p class="mb-0">
                     
                      <span>${element.deadLine}</span>
                    </p>
                  </div>
                  <div
                    class="col-md-3 col-5 d-flex justify-content-around align-items-center flex-column flex-sm-row"
                  >
                    <i class="fa-solid fa-trash-can bg-danger"  onclick="removeRow(${i})"></i>
                    <i class="fa-solid fa-check-double bg-success" onclick="Done(${i})"></i>
                    <i class="fa-solid fa-pen-to-square bg-primary" onclick="Update(${i})"></i>
                  </div>
      </div>`;
  });
  tasksContainer.innerHTML = task;
  progressBar.innerHTML = `
   <label for="progress" class="text-light fs-2">${complet}/${tasksContent.length}</label>
   <progress id="progress" value="${complet}" max="${tasksContent.length}"></progress>`;
  resetForm();
}
// display();
// create
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let newTask = {
    taskInfo: newTaskInfo.value,
    deadLine: newTaskdeadLine.value
      ? `<i class="fa-solid fa-calendar-days text-dark"></i> ${newTaskdeadLine.value}`
      : "not determined yet",
    deadLineValue: newTaskdeadLine.value,
    taskDate: new Date().toLocaleDateString("en-GB"),
    isDone: "false",
  };
  if (formCotrol == "submit") {
    tasksContent.push(newTask);
  } else if (formCotrol == "update") {
    tasksContent[rowUpdatedIndex] = newTask;
    localStorage.setItem("tasksContent", JSON.stringify(tasksContent));
  }
  localStorage.setItem("tasksContent", JSON.stringify(tasksContent));
  display();
});
// delete
function removeRow(i) {
  tasksContent.splice(i, 1);
  localStorage.setItem("tasksContent", JSON.stringify(tasksContent));
  display();
}
// upadete
function Update(i) {
  const myModal = new bootstrap.Modal(
    document.getElementById("staticBackdrop")
  );
  myModal.show();
  newTaskInfo.value = tasksContent[i].taskInfo;
  newTaskdeadLine.value = tasksContent[i].deadLineValue;
  formCotrol = "update";
  rowUpdatedIndex = i;
}
// Done
function Done(i) {
  tasksContent[i].isDone = "true";
  localStorage.setItem("tasksContent", JSON.stringify(tasksContent));
  display();
}
//reset form
function resetForm() {
  newTaskInfo.value = "";
  newTaskdeadLine.value = "";
  formCotrol = "submit";
}
if (tasksContent.length != 0) {
  display();
}
