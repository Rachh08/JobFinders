function viewResources() {
    fetch('http://localhost:5055/view')
        .then(response => response.json())
        .then(data => {
            const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody')[0];

            let html = '';
            data.forEach((job, index) => {
                html += `<tr>
                    <td>${index + 1}</td>
                    <td>${job.jobName}</td>
                    <td>${job.company}</td>
                    <td>${job.location}</td>
                    <td>${job.description}</td>
                    <td>${job.contact}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="editJob(${job.id})">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="deleteJob(${job.id})">Delete</button>
                    </td>
                </tr>`;
            });

            jobTable.innerHTML = html;
        })
        .catch(error => console.error('Error fetching job data:', error));
}


// // Call the function to load data when the page is loaded
// viewResources();


function addJob() {
    var jsonData = {
        jobName: document.getElementById("jobName").value,
        company: document.getElementById("company").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        contact: document.getElementById("contact").value,
    };

    // Validate jobName and company fields
    const onlyAlpha = /^[A-Za-z\s]{1,50}$/; // Alphabets and spaces, up to 50 characters
    if (!onlyAlpha.test(jsonData.jobName) || !onlyAlpha.test(jsonData.company)) {
        document.getElementById("message").innerHTML = 'Job name and company must contain alphabets only and be up to 50 characters long.';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    // Validate contact to include only 1 @ so that the user provides contact email
    const oneSpecial = /^[^@]*@[^@]+$/;
    if (!oneSpecial.test(jsonData.contact)) {
        document.getElementById("message").innerHTML = 'Provide valid contact details: email';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    // Check if any of the input fields is empty
    if (Object.values(jsonData).some(value => value === "")) {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5055/add-job", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        var response = JSON.parse(request.responseText);
        console.log(response);

        if (response.message === undefined) {
            document.getElementById("message").innerHTML = 'Added Job: ' + jsonData.jobName + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            // Clear input fields
            Object.keys(jsonData).forEach(key => {
                document.getElementById(key).value = "";
            });
            viewResources();         
        }else {
            document.getElementById("message").innerHTML = 'Unable to add Job!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}

