class Job {
    constructor(jobName, company, location, description, contact) {
        this.jobName = jobNameame;
        this.company = company;
        this.location = location;
        this.description = description;
        this.contact = contact;

        //Creating Unique Id for each job
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Job };