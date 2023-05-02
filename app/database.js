const mongoose = require("mongoose"); 
const { ATLAS_URI  } = require("./config"); 

mongoose
    .connect("mongodb+srv://impresionesbraminfd:g689sJWe8c2hCBys@cluster0.0j31isd.mongodb.net/test")

    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log(err))

