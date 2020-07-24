const planetModel               = require("../models/planet")
const { sequelize, dataTypes }  = require("../config/db")

const Planet = planetModel(sequelize, dataTypes);

exports.savePlanet = (req, res) => {
    let {name, orbitalSpeed, circumference} = req.body;
    
    if(!name){
        res.status(505).send("Unable to save planet because name is missing");
        return 0;
    }

    Planet.create(
    { 
        name          : name, 
        orbitalSpeed  : orbitalSpeed, 
        circumference : circumference 
    })
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(505).send(`(Save Planet) Unable to save planet because ${err}`);
    });
}

exports.updatePlanet = (req, res) => {
    
    const name       = req.params.name;
    const planetData = req.body;  

    Planet.findByPk(name)
    .then((result) => {

        if(!result) res.status(200).send(`Planet ${name} couldn't be found`)
        else {

            for(let key of Object.keys(planetData)) result[key] = planetData[key];
            
            result.save()
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(505).send(`(Update Planet) Unable to update Planet because ${err}`)
            })
        }
    })
    .catch((err) => {
        res.status(505).send(`(Update Planet) Unable to retrieve Planet because ${err}`);
    })
}

exports.deletePlanet = (req, res) => {
    
    const name = req.params.name
    
    Planet.findByPk(name)
    .then((result) => {
        if(!result) 
            res.status(200).send(`Planet ${name} couldn't be found`)
        else {
            result.destroy()
            .then((result) => {
                res.status(200).send(`Planet ${name} deleted successfuly!`);
            })
            .catch((err) => {
                res.status(500).send(`(Delete Planet) Planet ${name} coulnd't be deleted because ${err}`)
            })
        }
    })
    .catch((err) => {
        res.status(505).send(`(Delete Planet) Unable to retrieve Planet ${name}`)
    })
}

exports.getPlanet = (req, res) => {
    
    const name = req.params.name
    
    Planet.findByPk(name)
    .then((result) => {
        if(!result)
            res.status(200).send(`Planet ${name} couldn't be found`);
        else
            res.status(200).json(result);
    })
    .catch((err) => {
        res.status(505).send(`(GET Planet) Error: ${err}`)
    })
}

exports.getPlanets = (req, res) => {
    
    Planet.findAll()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        res.status(505).send(`(GET Planets) Error: ${err}`)
    })
}