const { readJSON, writeJSON } = require('./UserUtil')
const { Job } = require('../models/Job');

async function viewJobs(req, res) {
    try {
        const allJobs = await readJSON('utils/jobs.json');
        return res.status(201).json(allJobs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    viewJobs
};