// Fetch the JSON data from the server
fetch('../data/forms.json')
    .then(response => response.json())
    .then(data => {
        // Get the table element
        const forms = data.forms;
        const table = document.getElementById('formsBody');

        var overDue = [];
        var completedFormsArr = [];

        // get array of completed forms from local storage
        const completedForms = JSON.parse(localStorage.getItem('completedForms')) || [];

        // Iterate over the forms and populate the table
        forms.forEach(form => {
            const row = table.insertRow();
            const formCheckboxCell = row.insertCell();
            const formTitleCell = row.insertCell();
            const formDateCell = row.insertCell();
            const descriptionCell = row.insertCell();

            // add checkbox to the cell and add event listener for completing form and saving to local storage
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "checkbox";
            checkbox.id = form.title;
            checkbox.value = form.title;
            checkbox.title = "Mark as complete";
            // check if form is already completed in localstorage
            if (completedForms.includes(form.title)) {
                checkbox.checked = true;
                row.className = "formrow-complete";
            }
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    completedForms.push(this.value);
                    // check if it was overdue to update the text
                    if (row.className == "formrow-overdue") {
                        overdueForms--;
                        overdueText.textContent = "You have " + overdueForms + " overdue forms";
                    }
                    // update forms left to complete
                    formsLeft--;
                    leftText.textContent = "You have " + formsLeft + " forms left to complete";
                    row.className = "formrow-complete";
                } else {
                    completedForms.splice(completedForms.indexOf(this.value), 1);
                    // check if the form is overdue
                    if (new Date(form.dueDate) > new Date()) {
                        row.className = "";
                    }
                    else {
                        row.className = "formrow-overdue";
                        overdueForms++;
                        overdueText.textContent = "You have " + overdueForms + " overdue forms";
                    }
                    // update forms left to complete
                    formsLeft++;
                    leftText.textContent = "You have " + formsLeft + " forms left to complete";
                }
                localStorage.setItem('completedForms', JSON.stringify(completedForms));
            });
            formCheckboxCell.appendChild(checkbox);

            // do not display the link if it is empty
            if (form.url == "" || form.url == null) {
                formTitleCell.textContent = form.title;
            }
            else {
                const aElement = document.createElement('a');
                aElement.textContent = form.title;
                aElement.href = form.url;
                aElement.target = "_blank";
                aElement.title = "Open " + form.title;
                formTitleCell.appendChild(aElement);
            }
            // add description
            descriptionCell.textContent = form.description;

            // process the date
            const date = new Date(form.dueDate);
            // output the date as Month Day, Year
            const dateOptions = { month: 'long', day: 'numeric', time: 'numeric', timeZone: 'PST'};
            const timeOptions = { hour: 'numeric', minute: '2-digit', timeZone: 'PST'};
            formDateCell.textContent = date.toLocaleString('en-US', dateOptions) + " by " + date.toLocaleTimeString('en-US', timeOptions);

            // check if the form is completed
            if (completedForms.includes(form.title)) {
                row.className = "formrow-complete";
                completedFormsArr.push(row);
            }
            else if (date < new Date()) { // or check if it's overdue
                // add to list to append to the table at the very end
                row.className = "formrow-overdue";
                overDue.push(row);
            }
            else {
                table.appendChild(row);
            }

        });

        // append overdue forms to the table
        overDue.forEach(row => {
            table.appendChild(row);
        });
        completedFormsArr.forEach(row => {
            table.appendChild(row);
        });

        // modify left and overdue text
        const leftText = document.getElementById('formsLeftText');
        const overdueText = document.getElementById('formsOverdueText');

        // get the number of forms left to complete
        var formsLeft = forms.length - completedForms.length;
        leftText.textContent = "You have " + formsLeft + " forms left to complete";

        // get the number of overdue forms
        var overdueForms = overDue.length;
        overdueText.textContent = "You have " + overdueForms + " overdue forms";


    })
    .catch(error => console.error('Error:', error));