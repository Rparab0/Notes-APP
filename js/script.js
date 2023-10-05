// Function to populate the table from local storage
function populateTable() {
  let itemJsonArray = localStorage.getItem("itemsJson");

  if (itemJsonArray !== null) {
    itemJsonArray = JSON.parse(itemJsonArray);
    let tableBody = document.getElementById("tableBody");
    let str = "";

    itemJsonArray.forEach((element, index) => {
      str += `<tr>
                  <th scope="row">${index + 1}</th>
                  <td>${element[0]}</td>
                  <td>${element[1]}</td>
                  <td>
                    <button class="btn btn-primary btn-danger btn-sm" onclick="deleted(${index})">Delete</button>
                  </td>
                </tr>`;
    });

    tableBody.innerHTML = str;
  }
}

// Function to clear local storage and refresh the table

strclr = document.getElementById("clearStorage");
strclr.addEventListener("click", function () {
  let itemJsonArray = []; // Declare itemJsonArray here
  localStorage.clear();
  console.log("storage cleared");
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  populateTable();
});

function update() {
  console.log("Updating");
  let tit = document.getElementById("title").value;
  let desc = document.getElementById("Description").value;

  // Retrieve existing data from local storage
  let itemJsonArray = [];

  if (tit.trim() === "" || desc.trim() === "") {
    alert("Please fill in both the title and description fields.");
    return; // Stop execution if the fields are empty
  }

  if (localStorage.getItem("itemsJson") !== null) {
    itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
  }

  // Add new item to the array
  itemJsonArray.push([tit, desc]);

  // Store the updated array back in local storage
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

  // Update the UI with a spinner
  add.innerHTML = "Updating List...";

  setTimeout(() => {
    add.innerHTML = "Add to List";
  }, 600);

  // Populate the table
  let tableBody = document.getElementById("tableBody");
  let str = "";

  itemJsonArray.forEach((element, index) => {
    str += `<tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>
                  <button class="btn btn-primary btn-danger btn-sm" onclick="deleted(${index})">Delete</button>
                </td>
              </tr>`;
  });

  tableBody.innerHTML = str;

  // Clear the input fields
  document.getElementById("title").value = "";
  document.getElementById("Description").value = "";
}

let add = document.getElementById("add");
add.addEventListener("click", update);

// Call the populateTable function initially to load data from local storage
populateTable();

function deleted(itemIndex) {
  console.log("Delete", itemIndex);
  let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  populateTable(); // Refresh the table
}
