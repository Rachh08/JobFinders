class JobFilter {
    static filterJobs(jobs, filterCriteria) {
        return jobs.filter(job => {
            return job.category === filterCriteria.category;
        });
    }
}
module.exports = { JobFilter };
