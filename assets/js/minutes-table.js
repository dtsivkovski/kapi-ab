// Fetch the JSON data from the server
fetch('../data/minutes.json')
    .then(response => response.json())
    .then(data => {
        // Get the table element
        const minutes = data.minutes;
        const table = document.getElementById('minutesBody');

        // Iterate over the minutes and populate the table
        minutes.forEach(minute => {
            const row = table.insertRow();
            const minuteTitleCell = row.insertCell();
            const minuteDateCell = row.insertCell();
            const descriptionCell = row.insertCell();

            // do not display the link if it is empty
            if (minute.url == "" || minute.url == null) {
                minuteTitleCell.textContent = minute.title;
            }
            else {
                const aElement = document.createElement('a');
                aElement.textContent = minute.title;
                aElement.href = minute.url;
                aElement.target = "_blank";
                aElement.title = "Open " + minute.title + " on Google Docs";
                minuteTitleCell.appendChild(aElement);
            }
            // add description
            descriptionCell.textContent = minute.description;

            // process the date
            const date = new Date(minute.date);
            // output the date as Month Day, Year
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            minuteDateCell.textContent = date.toLocaleDateString('en-US', options);
        });
    })
    .catch(error => console.error('Error:', error));