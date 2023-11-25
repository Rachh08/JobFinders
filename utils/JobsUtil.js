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
        // Assuming you have a query parameter in the request for the job search
        const query = req.query.q;

        // Read jobs from the JSON file
        const allJobs = await readJSON('utils/jobs.json');

        // Filter jobs based on the query
        const searchResults = allJobs.filter(job => job.title.toLowerCase().includes(query.toLowerCase()));

        return res.status(200).json(searchResults);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { viewJobs, searchJobs };