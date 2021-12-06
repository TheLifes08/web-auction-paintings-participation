const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", (request, response) => {
    response.render("login", {
        authenticated: request.isAuthenticated(),
        user: request.user
    });
});

router.post("/", (request, response) => {
    if (!request.body.username || !request.body.password) {
        response.json({
            error: true,
            message: "Имя пользователя или пароль не задан."
        });
    } else {
        passport.authenticate("local", {}, (error, user) => {
            if (error) {
                response.json({error: true, message: error});
            } else {
                request.login(user, function (error) {
                    if (error) {
                        response.json({error: true, message: error});
                    }
                    response.json({error: false, message: "-"});
                });
            }
        })(request, response);
    }
});

module.exports = router;
