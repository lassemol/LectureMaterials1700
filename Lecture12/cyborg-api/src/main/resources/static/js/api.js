export const apiBaseUrl = "http://localhost:8080/api/cyborgs";
export const enhancementsApiUrl = "http://localhost:8080/api/enhancements";

// GET cyborgs
export function getCyborgs(callback) {
    fetch(apiBaseUrl)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(err => console.error(err));
}

// DELETE cyborg
export function deleteCyborg(id, callback) {
    if (confirm("Are you sure you want to delete this cyborg?")) {
        fetch(`${apiBaseUrl}/${id}`, {
            method: "DELETE"
        })
            .then(() => callback())
            .catch(err => console.error(err));
    }
}

// CREATE or UPDATE cyborg
export function saveCyborg(cyborgData, cyborgId, callback) {
    const url = cyborgId ? `${apiBaseUrl}/${cyborgId}` : apiBaseUrl;
    const method = cyborgId ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cyborgData)
    })
        .then(data => callback(data))
        .catch(err => console.error(err));
}

// GET enhancements
export function getEnhancements(cyborgId, callback) {
    fetch(`${enhancementsApiUrl}?cyborgId=${cyborgId}`)
        .then(res => res.json())
        .then(data => callback(data))
        .catch(err => console.error(err));
}

// CREATE or UPDATE enhancement
export function saveEnhancement(enhancementData, enhancementId, callback) {
    const url = enhancementId ? `${enhancementsApiUrl}/${enhancementId}` : enhancementsApiUrl;
    const method = enhancementId ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(enhancementData)
    })
        .then(data => callback(data))
        .catch(err => console.error(err));
}

// DELETE enhancement
export function deleteEnhancement(enhancementId, cyborgId, callback) {
    if (confirm("Are you sure you want to delete this enhancement?")) {
        fetch(`${enhancementsApiUrl}/${enhancementId}`, {
            method: "DELETE"
        })
            .then(() => callback(cyborgId))
            .catch(err => console.error(err));
    }
}