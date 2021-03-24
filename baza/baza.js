const mongoose = require("mongoose");

async function connect() {
    try {
        const link = "mongodb://localhost:27017/sportikus";

        const connection = await mongoose.connect(link, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        console.log("Baza je konektovana");
    } catch (err) {
        console.log(`Greska: ${err.message}`);
    }
}

module.exports = connect;
