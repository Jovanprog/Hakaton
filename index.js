const express = require("express");
const app = express();
const connect = require("./baza/baza");
const Vest = require("./baza/Vest");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server slusa na portu: ${PORT}`);
});

connect();

app.use(express.json());

app.use(express.static("front"));

app.get("/api/vesti", async (req, res) => {
    try {
        const sveVesti = await Vest.find();

        res.json({
            uspesno: true,
            vesti: sveVesti,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

app.post("/api/vesti", async (req, res) => {
    try {
        const autor = req.body.autor;
        const mail = req.body.mail;
        const naslov = req.body.naslov;
        const tekst = req.body.tekst;
        const rok = req.body.rok;

        const novaVest = new Vest({
            autor: autor,
            mail: mail,
            naslov: naslov,
            tekst: tekst,
            rok: rok
        });

        const sacuvanaVest = await novaVest.save();

        res.json({
            uspesno: true,
            vest: sacuvanaVest,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

app.get("/api/tim", async (req, res) => {
    try {
        const id = req.query.id;
        const sviTimovi = await Tim.findById(id);

        res.json({
            uspesno: true,
            timovi: sviTimovi,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

app.delete("/api/timovi/:id", async (req, res) => {
    try {
        const timId = req.params.id;

        const tim = await Tim.findById(timId);

        const obrisanTim = await tim.delete();

        res.json({
            uspesno: true,
            tim: obrisanTim,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

app.post("/api/clan", async (req, res) => {
    try {
        const timId = req.body.idTima;

        const tim = await Tim.findById(timId);

        const noviClan = {
            ime: req.body.ime,
            prezime: req.body.prezime,
            mail: req.body.mail,
            skola: req.body.skola,
        };

        tim.clanovi.push(noviClan);

        const sacuvanTim = await tim.save();

        res.json({
            uspesno: true,
            tim: sacuvanTim,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

app.post("/api/tehnologija", async (req, res) => {
    try {
        const timId = req.body.timId;
        const tehnologija = req.body.tehnologija;

        const tim = await Tim.findById(timId);

        tim.omiljeneTehnologije.push(tehnologija);

        const sacuvanTim = await tim.save();

        res.json({
            uspesno: true,
            tim: sacuvanTim,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});

app.get("/api/proba", async (req, res) => {
    try {
        const timovi = await Tim.find({
            omiljeneTehnologije: {
                $all: ["Javascript", "PHP"],
            },
        });

        res.json({
            uspesno: true,
            timovi: timovi,
        });
    } catch (err) {
        res.status(404).json({
            uspesno: false,
            poruka: err.message,
        });
    }
});
