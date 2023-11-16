const { JobFilter } = require('../models/JobFilter');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function filterJobs(filters) {
    const allJobs = await readJSON('utils/JobFilter.json');
    let filteredJobs = allJobs;

    if (filters.title) {
        filteredJobs = filteredJobs.filter((job) => job.title.toLowerCase().includes(filters.title.toLowerCase()));
    }

    if (filters.location) {
        filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.category) {
        filteredJobs = filteredJobs.filter((job) => job.category.toLowerCase().includes(filters.category.toLowerCase()));
    }

    if (filters.minSalary) {
        filteredJobs = filteredJobs.filter((job) => job.salary >= filters.minSalary);
    }

    if (filters.employmentType) {
        filteredJobs = filteredJobs.filter((job) => job.employmentType.toLowerCase().includes(filters.employmentType.toLowerCase()));
    }

    return filteredJobs;
}

module.exports = { readJSON, writeJSON, filterJobs };
