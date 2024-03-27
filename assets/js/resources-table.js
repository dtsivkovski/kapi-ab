// Fetch the JSON data from the server
fetch('../data/resources.json')
    .then(response => response.json())
    .then(data => {
        // Get the table element
        const resources = data.resources;
        const table = document.getElementById('resourcesBody');

        // Iterate over the resources and populate the table
        resources.forEach(resource => {
            const row = table.insertRow();
            const resourceLinkCell = row.insertCell();
            const descriptionCell = row.insertCell();

            const aElement = document.createElement('a');
            aElement.textContent = resource.resource;
            aElement.href = resource.link;

            resourceLinkCell.appendChild(aElement);
            descriptionCell.textContent = resource.description;
        });
    })
    .catch(error => console.error('Error:', error));