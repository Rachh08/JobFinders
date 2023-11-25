const JobSearch = require('../models/JobSearch');

// Search function using the Job model
function performSearch(query, sortBy = 'relevance') {
    if (!query) {
        // Return all jobs 
        return jobs;
    }

    const lowercasedQuery = query.toLowerCase();
    const results = jobs.filter(job => job.title.toLowerCase().includes(lowercasedQuery));

    if (sortBy === 'relevance') {
        // Custom sorting logic based on relevance
        results.sort((a, b) => {
            const aIncludes = a.title.toLowerCase().includes(lowercasedQuery);
            const bIncludes = b.title.toLowerCase().includes(lowercasedQuery);

            if (aIncludes && !bIncludes) {
                return -1;
            } else if (!aIncludes && bIncludes) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'alphabetical') {
        // Sort alphabetically
        results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
}

module.exports = { performSearch };
