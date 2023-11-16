class JobSearch {
    static SearchJobs(jobs, searchCriteria) {
        return jobs.search(job => {
            return job.category === searchCriteria.category;
        });
    }
}
module.exports = { JobSearch };
