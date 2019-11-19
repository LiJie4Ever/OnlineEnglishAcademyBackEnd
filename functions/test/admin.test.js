const chai = require('chai');
const assert = chai.assert;
const myFunctions = require('../index');

describe('addBlog', () => {
    it('testing with correct parameters, should add an entry to the database', (done) => {
        const req = {body: {id: "test_blog", fields: {title: "test_blog", author: "author", content: "content"}}};
        const res = {
            json: (js) => {
                assert.equal(JSON.stringify(js), JSON.stringify({ Success: "Blog added" }));
                done();
            },
        }
        myFunctions.addBlog(req, res);
    });
});


describe('modifyBlog', () => {
    it('testing with invalid id, should return "Invalid ID error"', (done) => {
        const req = { body: { id: 0 } };
        const res = {
            json: (js) => {
                assert.equal(JSON.stringify(js), JSON.stringify({ Error: "Invalid ID" }));
                done();
            },
        };
        myFunctions.modifyBlog(req, res);
    });

    it('testing with id that does not exist, should return "Blog not found error"', (done) => {
        const req = { body: { id: "blog_not_in_table", fields: { title: "changed_blog" } } };
        const res = {
            json: (js) => {
                assert.equal(JSON.stringify(js), JSON.stringify({ Error: "Blog not found" }));
                done();
            },
        };
        myFunctions.modifyBlog(req, res);
    });

    it('testing with correct parameters, database should be modified', (done) => {
        const req = { body: { id: "test_blog", fields: { title: "changed_blog" } } };
        const res = {
            json: (js) => {
                assert.equal(JSON.stringify(js), JSON.stringify({ Success: "Blog modified" }));
                done();
            },
        };
        myFunctions.modifyBlog(req, res);
    });
});


describe("removeBlog", () => {
    it('testing with invalid id, should return "Invalid ID error"', (done) => {
        const req = { body: { id: 0 } };
        const res = {
            json: (js) => {
                assert.equal(JSON.stringify(js), JSON.stringify({ Error: "Invalid ID" }));
                done();
            },
        };
        myFunctions.removeBlog(req, res);
    });

    it('testing with id that does not exist, should return "Blog not found error"', (done) => {
        const req = { body: { id: "blog_not_in_table" } };
        const res = {
            json: (js) => {
                assert.equal(JSON.stringify(js), JSON.stringify({ Error: "Blog not found" }));
                done();
            },
        };
        myFunctions.removeBlog(req, res);
    });

    it('testing with correct parameters, entry should be removed', (done) => {
        const req = { body: { id: "test_blog"} };
        const res = {
            json: (js) => {
                assert.equal(JSON.stringify(js), JSON.stringify({ Success: "Blog removed" }));
                done();
            },
        };
        myFunctions.removeBlog(req, res);
    });
});
