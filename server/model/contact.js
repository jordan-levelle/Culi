const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema ( {
    firstname : String,
    lastname : String,
    message : String,
    email : String
});

module.exports=mongoose.model("contacts", contactSchema);