let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require("../app");

var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

describe('Unit tests for Tools API', () => {
    describe("Get endpoint", () => {
        it("It should GET all tools", (done) => {
            chai.request(server)
            .get("/tools")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(8);
                done();
            })
        });

        it("It should NOT GET all the tools", (done) => {
            chai.request(server)
            .get("/tool")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
        });
    });

    describe("Test the getById function", () => {
        it("It should GET a tool by ID", (done) => {
            const toolId = 6;
            chai.request(server)
            .get("/tools/" + toolId)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id');
                response.body.should.have.property('description');
                response.body.should.have.property('hire_price');
                response.body.should.have.property('id').eq(6);
                done();
            });
        });

        it("It should NOT GET a tool by ID", (done) => {
            const toolId = 123;
            chai.request(server)
            .get("/tools/" + toolId)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            })
        });
    });

    describe("Test the create function", () => {
        it("It should POST a new tool", (done) => {
            const tool = {
                description: "Chisel",
                hire_price: '3.2',
                tool_category_id: '2'
            }

            chai.request(server)
            .post("/tools")
            .send(tool)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('description').eq('Chisel');
                response.body.should.have.property('hire_price').eq('3.2');
                response.body.should.have.property('tool_category_id').eq('2');
                done();
            })
        });
    })
});


function sayHello() {
    return "Hello, ";
}

function greet(message, name) {
    console.log(message + name);
}

// sayHello function passed as an argument
greet(sayHello(), "Ryan"); 
// Will print "Hello, Ryan";



