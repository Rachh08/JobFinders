const { readJSON, writeJSON } = require('./UserUtil')
const { Job } = require('../models/jobs.js');



async function addJobs(req, res) {
    try {
        const jobName = req.body.jobName;
        const company = req.body.company;
        const location = req.body.location;
        const description = req.body.description;
        const contact = req.body.contact;

        // Check if any of the input fields is empty
        if (!jobName || !company || !location || !description || !contact) {
            return res.status(400).json({ message: 'All input fields must be filled.' });
        }


         // Validate jobName and company fields
         const onlyAlpha= /^[A-Za-z\s]{1,50}$/; // Alphabets and spaces, up to 50 characters
         if (!onlyAlpha.test(jobName) || !onlyAlpha.test(company)) {
             return res.status(400).json({ message: 'Job name and company must contain alphabets only and be up to 50 characters long.' });
         }

         //Validate contact to include only 1 @ so that user provides contact email
         const oneSpecial = /^[^@]*@[^@]+$/;
         if(!oneSpecial.test(contact)) {
            return res.status(400).json({message: "Provide valid contact details: email"})
         } 

        const newJob = new Job(jobName, company, location, description, contact);

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
    addJobs, viewJobs
};