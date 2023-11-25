const { readJSON, writeJSON } = require('./UserUtil')
const { Job } = require('../models/jobs.js');


async function addJobs(req, res) {
    try {
    const name = req.body.name;
    const company = req.body.company;
    const location = req.body.location;
    const description = req.body.description;
    const contact = req.body.contact;
    const newJob = new Job(name, company, location, description, contact);
    const updatedJob = await writeJSON(newJob, 'utils/jobs.json');
    return res.status(201).json(updatedJob);
    } catch (error) {
    return res.status(500).json({ message: error.message });
    }
    }


async function viewJobs(req, res) {
    try {
        const allJobs = await readJSON('utils/jobs.json');
        return res.status(201).json(allJobs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addJobs,viewJobs
};