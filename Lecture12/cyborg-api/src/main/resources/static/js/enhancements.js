import { getEnhancements, saveEnhancement, deleteEnhancement } from "./api.js";

export function loadEnhancements(cyborgId) {
    document.querySelector("#cyborgEnhancementId").value = cyborgId;

    const list = document.querySelector("#enhancementsList");
    list.innerHTML = "";

    getEnhancements(cyborgId, (data) => {
        data.forEach(enhancement => {
            const li = document.createElement("li");

            li.className = "list-group-item d-flex justify-content-between align-items-center";

            li.innerHTML = `
                <span>${enhancement.name} - ${enhancement.type} (${enhancement.manufacturer})</span>
                <div>
                    <button class="btn btn-warning btn-sm edit-enhancement"
                        data-id="${enhancement.id}"
                        data-name="${enhancement.name}"
                        data-desc="${enhancement.description}"
                        data-type="${enhancement.type}"
                        data-manufacturer="${enhancement.manufacturer}"
                        data-cyborg-id="${enhancement.cyborgId}">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm delete-enhancement"
                        data-id="${enhancement.id}">
                        Delete
                    </button>
                </div>
            `;

            list.appendChild(li);
        });
    });

    // Bootstrap 5 modal (no jQuery)
    const modalElement = document.getElementById("enhancementsModal");
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

export function handleEnhancementForm(event) {
    event.preventDefault();

    const enhancementId = document.querySelector("#enhancementId").value;
    const cyborgId = document.querySelector("#cyborgEnhancementId").value;

    const enhancementData = {
        name: document.querySelector("#enhancementName").value,
        description: document.querySelector("#enhancementDescription").value,
        type: document.querySelector("#enhancementType").value,
        manufacturer: document.querySelector("#enhancementManufacturer").value,
        cyborgId: cyborgId
    };

    saveEnhancement(enhancementData, enhancementId, () => {
        alert(enhancementId ? "Enhancement updated!" : "Enhancement added!");

        document.querySelector("#enhancementForm").reset();
        document.querySelector("#enhancementId").value = "";

        toggleEnhancementFormButtons(false);
        loadEnhancements(cyborgId);
    });
}

export function toggleEnhancementFormButtons(isEditing) {
    document.querySelector("#cancelEnhancementEdit")
        .classList.toggle("d-none", !isEditing);

    document.querySelector("#createEnhancementButton")
        .classList.toggle("d-none", isEditing);

    document.querySelector("#updateEnhancementButton")
        .classList.toggle("d-none", !isEditing);
}