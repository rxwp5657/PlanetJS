const express = require("express")
const router  = express.Router();

const { savePlanet,
        updatePlanet, 
        deletePlanet,
        getPlanet,
        getPlanets 
    } = require("../controllers/planetController")

router.get("/planets",          getPlanets);
router.get("/planets/:name",    getPlanet);

router.post("/planet",          savePlanet);
router.put("/planets/:name",    updatePlanet);

router.delete("/planets/:name", deletePlanet);

module.exports = router;