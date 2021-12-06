const express = require("express");
const passport = require("passport");
let storage = require("../../../storage");

const router = express.Router();

function getPainting(id) {
    return storage.paintings.find((painting) => {
        return painting.id.toString() === id.toString();
    });
}

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.json(storage.paintings);
});

router.get("/:paintingId([0-9]{1,})", passport.authenticationMiddleware(), (request, response) => {
    let painting = getPainting(request.params.paintingId);

    if (painting) {
        response.json(painting);
    } else {
        response.json(null);
    }
});

module.exports = router;