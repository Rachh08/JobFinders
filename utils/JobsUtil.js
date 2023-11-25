const { readJSON, writeJSON } = require('./UserUtil')
const { Job } = require('../models/jobs.js');

async function viewJobs(req, res) {
    try {
        const allJobs = await readJSON('utils/jobs.json');
        return res.status(201).json(allJobs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function searchJobs(req, res) {
    try {
        // Assuming you have the search query in the request body
        const query = req.body.q;

        if (!query) {
            return res.status(400).json({ message: "Search query is required in the request body." });
        }

        // Check if the query contains only letters
        if (!/^[a-zA-Z]+$/.test(query)) {
            return res.status(400).json({ message: "Search query should only contain letters." });
        }

        // Read jobs from the JSON file
        const allJobs = await readJSON('utils/jobs.json');

        // Filter jobs based on the query matching jobName
        const searchResults = allJobs.filter(job => job.jobName.toLowerCase().includes(query.toLowerCase()));

        return res.status(200).json(searchResults);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { viewJobs, searchJobs };