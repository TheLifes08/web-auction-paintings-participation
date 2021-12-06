let socket = io.connect("http://localhost:8090");

socket.on("status-message", (data) => {
    printMessage(data.message);
});

$(document).ready(() => {
    $.get("/storage/paintings").done((paintings) => {
        if (paintings) {
            let filteredPaintings = paintings.filter(painting => painting.placedOnAuction);
            let tableBody = $("#paintings-table-body");

            for (let painting of filteredPaintings) {
                let row = createPaintingsTableRow(painting);
                tableBody.append(row);
            }
        }
    });

    $.get("/storage/users").done((users) => {
        if (users) {
            let filteredUsers = users.filter(user => user.participate);
            let tableBody = $("#users-table-body");

            for (let user of filteredUsers) {
                let row = createUsersTableSmallRow(user);
                tableBody.append(row);
            }
        }
    });
});

function printMessage(message) {
    let date = new Date();
    $("#status-textarea").append(`[${date.toLocaleTimeString()}] ${message}\n`);
}