const readline = require('readline');
const fs = require('fs');
const JobSearchUtil = require('./JobSearchUtil');

// Read job data from the JSON file
const jobData = JSON.parse(fs.readFileSync('jobs.json', 'utf8'));

// Create a JobSearchUtil instance with job data
const jobSearchUtil = new JobSearchUtil(jobData);

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to search and print job details based on user input
function searchJobs() {
    rl.question('Enter the job to search: ', (userInput) => {
        const lowercasedInput = userInput.toLowerCase(); // Convert user input to lowercase

        const searchResults = jobSearchUtil.getAllJobs().filter(job => {
            const lowercasedJobName = job.jobName.toLowerCase(); // Convert job name to lowercase
            return lowercasedJobName.includes(lowercasedInput);
        });

        if (searchResults.length > 0) {
            console.log('Search Results:');
            searchResults.forEach(job => {
                console.log(`Job Name: ${job.jobName}`);
                console.log(`Company: ${job.company}`);
                console.log(`Location: ${job.location}`);
                console.log(`Description: ${job.description}`);
                console.log(`Contact: ${job.contact}`);
                console.log(`ID: ${job.id}`);
                console.log('-----------------------');
            });
        } else {
            console.log('No matching jobs found.');
        }

        // Close the readline interface
        rl.close();
    });
}

// Call the searchJobs function to start the search
searchJobs();
