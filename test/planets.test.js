const assert      = require('assert');
const chai        = require('chai');
const chaiHttp    = require('chai-http');
const planetModel = require('../models/planet');
const { before, beforeEach }   = require('mocha');
const { sequelize, dataTypes } = require('../config/db')
let { server } = require('../space');

const should = chai.should();
const Planet = planetModel(sequelize, dataTypes);

chai.use(chaiHttp);

describe("Planet Testing", () => {
    
    before(() => {
        server = server.listen(process.env.PORT || 3000); 
    })
    
    beforeEach(async () => {
        await Planet.destroy({
            where: {},
            truncate : true
        })
    });

    after(() => {
        server.close();
    })

    describe("Testing POST /planet", () => {
        it("It should save planet Earth into the database", (done) => {
            
            let earth = {
                name : "Earth",
                orbitalSpeed : 29.78,
                circumference: 40.075
            }
            
            chai.request(server)
                .post("/planet")
                .send(earth)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    assert.equal(res.body.name, "Earth")
                    done()
                });

        });
    });

    describe("Testing GET /planets/:name", () => {
        it("It should get the planet with name Earth", async () => {
            
            let earth = {
                name : "Earth",
                orbitalSpeed : 29.78,
                circumference: 40.075
            }
            
            await chai.request(server)
                    .post("/planet")
                    .send(earth)
                
            chai.request(server)
                .get("/planets/Earth")
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    assert.equal(res.body.name, "Earth")
                }); 
        });
    });

    describe("Testing GET /planets", () => {
        it("It should get all the planets available on the database", async () => {

            let earth = {
                name : "Earth",
                orbitalSpeed : 29.78,
                circumference: 40.075
            }

            let saturn = {
                name : "Saturn",
                orbitalSpeed : 9.68,
                circumference: 58.232
            }
            
            await chai.request(server)
                        .post("/planet")
                        .send(earth);

            await chai.request(server)
                        .post("/planet")
                        .send(saturn);
            
            let result = await chai.request(server).get("/planets")
            
            result.should.have.status(200)
            result.body.should.be.a('array')
            result.body.length.should.be.eql(2)
            assert.equal(result.body[0].name, "Earth")
            assert.equal(result.body[1].name, "Saturn")
        })
    })

    describe("Testing PUT /planets/:name", async () => {
        it("It should update the planet Earth by changing its orbital speed and circumference", async () => {
            
            let earth = {
                name : "Earth",
                orbitalSpeed : 29.78,
                circumference: 40.075
            }
            
            await chai.request(server)
                      .post("/planet")
                      .send(earth);
            
            earth.orbitalSpeed  = 20.0;
            earth.circumference = 10.0;

            let result = await chai.request(server)
                                   .put("/planets/Earth")
                                   .send(earth)

            // console.log(result);

            result.should.have.status(200)
            result.body.should.be.an('object')
            assert.equal(result.body.name,          "Earth")
            assert.equal(result.body.orbitalSpeed,  20.0)
            assert.equal(result.body.circumference, 10.0)
        });
    });

    describe("Testing DELETE /planets/:name", () => {
        it("It should delete the planet earth from the database", async () => {
            
            let earth = {
                name : "Earth",
                orbitalSpeed : 29.78,
                circumference: 40.075
            }
            
            await chai.request(server)
                      .post("/planet")
                      .send(earth);

            let result = await chai.request(server).delete("/planets/Earth")
            
            result.should.have.status(200)
            result.body.should.be.a('object')
            assert.equal(result.text, "Planet Earth deleted successfuly!")
        });
    });
    
    describe("Testing POST /planet", () => {
        it("It should fail the insertion and we should get a message of why it failed", (done) => {

            let planet = {
                name : "",
                orbitalSpeed : 29.78,
                circumference: 40.075
            }

            chai.request(server)
                .post("/planet")
                .send(planet)
                .end((err, res) => {
                    res.should.have.status(505);
                    res.should.be.a('object')
                    assert.equal(res.text, "Unable to save planet because name is missing")
                    done()
                });
        });
    });
});