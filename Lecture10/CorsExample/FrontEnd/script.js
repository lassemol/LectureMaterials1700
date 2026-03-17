const BASE_URL = "http://localhost:8080/api/yarns";

const yarnInput = document.getElementById("yarnInput");
const addBtn = document.getElementById("addBtn");
const yarnList = document.getElementById("yarnList");


// LOAD ALL
async function loadYarns() {
    const response = await fetch(BASE_URL);
    const yarns = await response.json();

    yarnList.innerHTML = "";

    yarns.forEach((yarn, index) => {

        const li = document.createElement("li");
        li.textContent = `${index}: ${yarn} `;

        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", () => {
            updateYarn(index);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteYarn(index);
        });

        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);

        yarnList.appendChild(li);
    });
}


// CREATE
async function addYarn() {
    if (!yarnInput.value) return;

    await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: yarnInput.value
    });

    yarnInput.value = "";
    loadYarns();
}


// UPDATE
async function updateYarn(index) {
    const newName = prompt("Enter new yarn name:");
    if (!newName) return;

    await fetch(`${BASE_URL}/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "text/plain" },
        body: newName
    });

    loadYarns();
}


// DELETE
async function deleteYarn(index) {
    await fetch(`${BASE_URL}/${index}`, {
        method: "DELETE"
    });

    loadYarns();
}

addBtn.addEventListener("click", addYarn);

loadYarns();
