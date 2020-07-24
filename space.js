const express       = require("express")
const bodyParser    = require("body-parser")
const planetRoutes  = require("./routes/planetRoutes")

const app   = express();
const PORT  = process.env.PORT || 3000;
const ENV   = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(planetRoutes);

if(ENV === "test"){
    exports.server = app;
} 
else {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
}