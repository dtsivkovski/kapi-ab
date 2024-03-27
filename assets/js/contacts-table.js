// Fetch the JSON data from the server
fetch('../data/contacts.json')
    .then(response => response.json())
    .then(data => {
        // Get the table element
        const resources = data.contacts;
        const table = document.getElementById('contactsBody');

        // Iterate over the resources and populate the table
        resources.forEach(resource => {
            const row = table.insertRow();
            const contactNameCell = row.insertCell();
            const positionCell = row.insertCell();

            contactNameCell.textContent = resource.name;
            positionCell.textContent = resource.position;
        });
    })
    .catch(error => console.error('Error:', error));