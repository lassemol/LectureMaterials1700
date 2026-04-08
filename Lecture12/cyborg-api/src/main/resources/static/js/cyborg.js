import { getCyborgs, deleteCyborg, saveCyborg } from "./api.js";

export function loadCyborgs() {
    getCyborgs((data) => {
        const tableBody = document.querySelector("#cyborgTable");
        tableBody.innerHTML = "";

        data.forEach(cyborg => {
            const row = document.createElement("tr");

            row.dataset.id = cyborg.id;
            row.dataset.name = cyborg.name;
            row.dataset.birthyear = cyborg.birthYear;
            row.dataset.country = cyborg.country;
            row.dataset.bio = cyborg.bio;

            row.innerHTML = `
                <td>${cyborg.id}</td>
                <td>${cyborg.name}</td>
                <td>${cyborg.birthYear}</td>
                <td>${cyborg.country}</td>
                <td>${cyborg.bio}</td>
                <td>
                    <button class="btn btn-info btn-sm manage-enhancements">Manage Enhancements</button>
                    <button class="btn btn-warning btn-sm edit-cyborg">Edit</button>
                    <button class="btn btn-danger btn-sm delete-cyborg">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    });
}

export function editCyborg(id, name, birthYear, country, bio) {
    document.querySelector("#cyborgId").value = id;
    document.querySelector("#cyborgName").value = name;
    document.querySelector("#cyborgBirthYear").value = birthYear;
    document.querySelector("#cyborgCountry").value = country;
    document.querySelector("#cyborgBio").value = bio;
}

export function handleCyborgForm(event) {
    event.preventDefault();

    const cyborgId = document.querySelector("#cyborgId").value;

    const cyborgData = {
        name: document.querySelector("#cyborgName").value,
        birthYear: document.querySelector("#cyborgBirthYear").value,
        country: document.querySelector("#cyborgCountry").value,
        bio: document.querySelector("#cyborgBio").value
    };

    saveCyborg(cyborgData, cyborgId, () => {
        alert(cyborgId ? "Cyborg updated!" : "Cyborg added!");

        document.querySelector("#cyborgForm").reset();
        document.querySelector("#cyborgId").value = "";

        toggleCyborgFormButtons(false);
        loadCyborgs();
    });
}

export function toggleCyborgFormButtons(isEditing) {
    document.querySelector("#cancelCyborgEdit")
        .classList.toggle("d-none", !isEditing);

    document.querySelector("#createCyborgButton")
        .classList.toggle("d-none", isEditing);

    document.querySelector("#updateCyborgButton")
        .classList.toggle("d-none", !isEditing);
}