const apiUrl = "api/enhancements"; // Replace with your actual API URL
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById("deviceTableBody");
        data.forEach(device => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${device.id}</td>
                <td>${device.name}</td>
                <td>${device.description}</td>
                <td>${device.type}</td>
                <td>${device.manufacturer}</td>
            `;

            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error("Error fetching data:", error));
