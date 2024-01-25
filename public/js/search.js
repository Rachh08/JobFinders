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
    fetch("/search?query=" + encodeURIComponent(query), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if the job was found or not
            if (data.job) {
                // Display the job details
                displaySearchResults(data.job);
            } else {
                // Display a message indicating that the job was not found
                displayNoResults();
            }
        })
        .catch(error => {
            console.error('Network error occurred', error);
            // Handle the error, e.g., display an error message
        });
}

function displaySearchResults(job) {
    var searchResultsContainer = document.getElementById("searchResults");

    // Clear previous search results
    searchResultsContainer.innerHTML = "";

    // Display the job details 
    var resultParagraph = document.createElement("p");
    resultParagraph.textContent = `Job Title: ${job.title}, Company: ${job.company}, Location: ${job.location}`;

    searchResultsContainer.appendChild(resultParagraph);
}

function displayNoResults() {
    var searchResultsContainer = document.getElementById("searchResults");

    // Clear previous search results
    searchResultsContainer.innerHTML = "";

    // Display a message indicating that the job was not found
    var noResultsParagraph = document.createElement("p");
    noResultsParagraph.textContent = "Sorry, no such job available.";

    searchResultsContainer.appendChild(noResultsParagraph);
}
