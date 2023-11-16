const { SearchFilter } = require('../models/JobSearch');
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

async function searchJobs(filters) {
    const allJobs = await readJSON('utils/JobFilter.json');
    let searchedJobs = allJobs;

    if (filters.title) {
        searchedJobs = searchedJobs.filter((job) => job.title.toLowerCase().includes(filters.title.toLowerCase()));
    }

    if (filters.location) {
        searchedJobs = searchedJobs.filter((job) => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    // if (filters.category) {
    //     searchedJobs = searchedJobs.filter((job) => job.category.toLowerCase().includes(filters.category.toLowerCase()));
    // }

    // if (filters.minSalary) {
    //     searchedJobs = searchedJobs.filter((job) => job.salary >= filters.minSalary);
    // }

    if (filters.employmentType) {
        searchedJobs = searchedJobs.filter((job) => job.employmentType.toLowerCase().includes(filters.employmentType.toLowerCase()));
    }

    return searchedJobs;
}

module.exports = { readJSON, writeJSON, searchJobs };
