const JobSearch = require('../models/JobSearch');

// Array of jobs
const jobs = [
    new JobSearch(1, 'Chef'),
    new JobSearch(2, 'Web Developer'),
    new JobSearch(3, 'Zoo Keeper'),
    new JobSearch(4, 'Tuition Teacher'),
    new JobSearch(5, 'Sports Teacher'),
    new JobSearch(6, 'Personal Assistant'),
    new JobSearch(7, 'Bus Driver'),
    new JobSearch(8, 'Grocery Sales'),
    new JobSearch(9, 'Manager'),
    new JobSearch(10, 'Kpop Idol Manager')
];

// Search function using the Job model
function performSearch(query, sortBy = 'relevance') {
    if (!query) {
        // Return all jobs or handle it as needed
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
    } else {
        // Handle invalid sortBy options (you can throw an error or default to a specific option)
        console.error(`Invalid sortBy option: ${sortBy}. Defaulting to 'relevance'.`);
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
    }

    return results;
}

module.exports = { performSearch };
