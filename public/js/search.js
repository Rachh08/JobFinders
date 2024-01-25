document.addEventListener("DOMContentLoaded", function () {
    var searchForm = document.getElementById("searchForm");

    if (searchForm) {
        searchForm.addEventListener("submit", performSearch);
    } else {
        console.error("Search form element not found.");
    }

});

function performSearch(event) {
    event.preventDefault();

    var query = document.getElementById("query").value;

    // Make a GET request to the server with the query as a parameter
    fetch('http://localhost:5055/search-jobs', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: query }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json(); // Parse JSON directly
            } else {
                throw new Error('Invalid content type in response');
            }
        })
        .then(data => {
            // Check if the job was found or not
            if (data.length > 0) {
                // Display the job details
                displaySearchResults(data);
            } else {
                // Display a message indicating that no jobs were found
                displayNoResults();
            }
        })
        .catch(error => {
            console.error('Network error occurred', error);
            // Handle the error, e.g., display an error message
        });
}


function displayNoResults() {
    var searchResultsContainer = document.getElementById("searchResults");

    // Clear previous search results
    searchResultsContainer.innerHTML = "";

    // Display a message indicating that no jobs were found
    var noResultsParagraph = document.createElement("p");
    noResultsParagraph.textContent = "Sorry, no jobs found.";
    searchResultsContainer.appendChild(noResultsParagraph);
}


// function displaySearchResults(jobs) {
//     var searchResultsContainer = document.getElementById("searchResults");

//     // Clear previous search results
//     searchResultsContainer.innerHTML = "";

//     if (jobs.length > 0) {

//         // Display each job details 
//         jobs.forEach(job => {

//             console.log("Processing job:", job);

//             var jobContainer = document.createElement("div");
//             jobContainer.classList.add("job-container");

//             var jobTitle = document.createElement("h2");
//             jobTitle.textContent = job.jobName;

//             var companyInfo = document.createElement("p");
//             companyInfo.textContent = `Company: ${job.company}, Location: ${job.location}, Contact: ${job.contact}`;

//             var jobDescription = document.createElement("p");
//             jobDescription.textContent = `Description: ${job.description}`;

//             jobContainer.appendChild(jobTitle);
//             jobContainer.appendChild(companyInfo);
//             jobContainer.appendChild(jobDescription);

//             searchResultsContainer.appendChild(jobContainer);
//         });
//     } else {
//         // Display a message indicating that no jobs were found
//         var noResultsParagraph = document.createElement("p");
//         noResultsParagraph.textContent = "Sorry, no jobs found.";
//         searchResultsContainer.appendChild(noResultsParagraph);
//     }

// Update your displaySearchResults function
function displaySearchResults(searchResults) {
    // Check if searchResults is defined and has a length property
    if (searchResults && searchResults.length) {
        // If there are results, build the HTML content and display it
        let htmlContent = "";
        for (let i = 0; i < searchResults.length; i++) {
            // Modify this part based on your actual data structure
            htmlContent += `<p>Job Name: ${searchResults[i].jobName}</p>`;
            htmlContent += `<p>Company: ${searchResults[i].company}</p>`;
            htmlContent += `<p>Location: ${searchResults[i].location}</p>`;
            htmlContent += `<p>Description: ${searchResults[i].description}</p>`;
            htmlContent += `<p>Contact: ${searchResults[i].contact}</p>`;
            // Add a horizontal line between job entries
            htmlContent += `<hr>`;
        }

        // Set the HTML content inside the modal
        $("#displaySearchResults").html(htmlContent);
    } else {
        // If there are no results, display a message or handle it as needed
        $("#displaySearchResults").html("<p>No results found</p>");
    }
}

