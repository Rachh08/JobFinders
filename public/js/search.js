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

    // Make an AJAX request to the server
    fetch("/search-endpoint", {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the received search results data
            displaySearchResults(data.results);
        })
        .catch(error => {
            console.error('Network error occurred', error);
            // Handle the error, e.g., display an error message
        });
}


function displaySearchResults(query) {
    var searchResultsContainer = document.getElementById("searchResults");

    // Clear previous search results
    searchResultsContainer.innerHTML = "";

    // Display the search results 
    var resultParagraph = document.createElement("p");
    resultParagraph.textContent = "Search results for: " + query;

    searchResultsContainer.appendChild(resultParagraph);
}
