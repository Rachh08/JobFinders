describe('Testing searchJobs Function', () => {
    it('Should return matching jobs for a valid query', async () => {

        const validQuery = 'developer';
        // Provide a valid search query
        const req = {
            body: {
                q: validQuery,
            },
        };

        const res = {
            status: function (code) {
                // Expecting a successful response code
                // expect(code).to.equal(500);
                expect(code).to.equal(200);
                return this;
            },
            json: function (data) {
                // Expecting data to be an array (matching jobs)
                // expect(data).to.have.property('message');
                expect(data.length).to.greaterThan(0);
            },
        };

        // Call searchJobs function
        await searchJobs(req, res);
    });

    // it('Should return a validation error for weak password', async () => {
    //     const invalidQuery = 'invalidquery'; // Provide a query with no matching jobs
    //     const req = {
    //         body: {
    //             q: invalidQuery,
    //         },
    //     };

    //     const res = {
    //         status: function (code) {
    //             expect(code).to.equal(400);
    //             return this;
    //         },
    //         json: function (data) {
    //             expect(data.message).to.include('Validation error');
    //         },
    //     };

    //     // Call your register function
    //     await register(req, res);
    // });


    it('Should return 400 for an invalid search query', async () => {
        const invalidQuery = '123invalid'; // Provide an invalid query (contains numbers)
        const req = {
            body: {
                q: invalidQuery,
            },
        };

        const res = {
            status: function (code) {
                // Expecting a bad request response code
                expect(code).to.equal(400);
                return this;
            },
            json: function (data) {
                // Expecting a message about an invalid search query
                console.log(data.error.message);
                expect(data.error.message).to.equal('Search query should only contain letters and spaces.');
            },
        };

        // Call your searchJobs function
        await searchJobs(req, res);
    });
});