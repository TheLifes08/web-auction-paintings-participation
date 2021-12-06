const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const storage = require("../../../storage");

const router = express.Router();

function getUserIds() {
    let ids = [];
    for (let user of storage.users) {
        ids.push(user.id);
    }
    return ids;
}

function createUser(name, password) {
    let id;
    let ids = getUserIds();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    for (let i = 1; i <= ids.length + 1; ++i) {
        if (!ids.includes(i)) {
            id = i;
            break;
        }
    }

    return {id: id, name: name, passwordHash: hash, balance: 0};
}

function getUser(id) {
    return storage.users.find((user) => {
        return user.id.toString() === id.toString();
    });
}

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.json(storage.users);
});

router.get("/current", passport.authenticationMiddleware(), (request, response) => {
   response.json(request.user);
});

router.get("/:userId([0-9]{1,})", passport.authenticationMiddleware(), (request, response) => {
    let user = getUser(request.params.userId);

    if (user) {
        response.json(user);
    } else {
        response.json(null);
    }
});

router.post("/", (request, response) => {
    let data = request.body;

    if (data && data.username && data.password) {
        let isExist = storage.users.find((user) => {
            return user.name === data.username;
        }) !== undefined;

        if (isExist) {
            response.json({error: true, message: "Пользователь с таким именем уже существует."});
        } else {
            storage.users.push(createUser(data.username, data.password));
            response.json({error: false, message: "Пользователь успешно зарегистрирован."});
        }
    } else {
        response.json({error: true, message: "Имя пользователя или пароль не задан."});
    }
});

router.put("/", passport.authenticationMiddleware(), (request, response) => {
    let userData = request.body;

    if (userData && userData.id) {
        let user = getUser(userData.id);

        if (userData.balance) {
            user.balance = Number(userData.balance);
        }
        if (userData.participate) {
            user.participate = userData.participate === "true";
        }

        response.json({error: false, message: "Информация о пользователе успешно обновлена."});
    } else {
        response.json({error: true, message: "Пользователь не найден."});
    }
});

module.exports = router;