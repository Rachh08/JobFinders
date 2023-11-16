class JobFilter {
    static filterJobs(jobs, filterCriteria) {
        return jobs.filter(job => {
            // Filtering logic 
            
            // For example filter by category
            return job.category === filterCriteria.category;
        });
    }
}
module.exports = { JobFilter };
