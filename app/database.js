const mongoose = require("mongoose"); 
const { ATLAS_URI  } = require("./config"); 

mongoose
    .connect()

    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log(err))

