const JobSearch = require('../models/JobSearch');

// Array of jobs
const jobs = [
    new Job(1, 'Chef'),
    new Job(2, 'Web Developer'),
    new Job(3, 'Zoo Keeper'),
    new Job(4, 'Tuition Teacher'),
    new Job(5, 'Sports Teacher'),
    new Job(6, 'Personal Assistant'),
    new Job(7, 'Bus Driver'),
    new Job(8, 'Grocery Sales'),
    new Job(9, 'Manager'),
    new Job(10, 'Kpop Idol Manager')
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
    }

    return results;
}

module.exports = { performSearch };
