import { loadCyborgs, editCyborg, handleCyborgForm, toggleCyborgFormButtons } from "./cyborg.js";
import { loadEnhancements, handleEnhancementForm, toggleEnhancementFormButtons } from "./enhancements.js";
import { deleteCyborg, deleteEnhancement } from "./api.js";

export function bindEvents() {
    document.querySelector("#cyborgForm").addEventListener("submit", handleCyborgForm);

    document.querySelector("#cyborgTable").addEventListener("click", function (event) {
        const editButton = event.target.closest(".edit-cyborg");
        if (editButton) {
            const row = editButton.closest("tr");
            toggleCyborgFormButtons(true);
            editCyborg(
                row.dataset.id,
                row.dataset.name,
                row.dataset.birthyear,
                row.dataset.country,
                row.dataset.bio
            );
            return;
        }

        const deleteButton = event.target.closest(".delete-cyborg");
        if (deleteButton) {
            const row = deleteButton.closest("tr");
            const id = row.dataset.id;
            deleteCyborg(id, loadCyborgs);
            return;
        }

        const manageButton = event.target.closest(".manage-enhancements");
        if (manageButton) {
            const row = manageButton.closest("tr");
            const cyborgId = row.dataset.id;
            loadEnhancements(cyborgId);
        }
    });

    document.querySelector("#cancelCyborgEdit").addEventListener("click", function () {
        document.querySelector("#cyborgForm").reset();
        document.querySelector("#cyborgId").value = "";
        toggleCyborgFormButtons(false);
    });

    document.querySelector("#fetchCyborgs").addEventListener("click", loadCyborgs);

    document.querySelector("#enhancementForm").addEventListener("submit", handleEnhancementForm);

    document.querySelector("#enhancementsList").addEventListener("click", function (event) {
        const editButton = event.target.closest(".edit-enhancement");
        if (editButton) {
            toggleEnhancementFormButtons(true);
            document.querySelector("#enhancementId").value = editButton.dataset.id;
            document.querySelector("#enhancementName").value = editButton.dataset.name;
            document.querySelector("#enhancementDescription").value = editButton.dataset.desc;
            document.querySelector("#enhancementType").value = editButton.dataset.type;
            document.querySelector("#enhancementManufacturer").value = editButton.dataset.manufacturer;
            return;
        }

        const deleteButton = event.target.closest(".delete-enhancement");
        if (deleteButton) {
            const enhancementId = deleteButton.dataset.id;
            const cyborgId = document.querySelector("#cyborgEnhancementId").value;
            deleteEnhancement(enhancementId, cyborgId, loadEnhancements);
        }
    });

    document.querySelector("#cancelEnhancementEdit").addEventListener("click", function () {
        document.querySelector("#enhancementForm").reset();
        document.querySelector("#enhancementId").value = "";
        toggleEnhancementFormButtons(false);
    });
}