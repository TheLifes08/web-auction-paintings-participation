function createUsersTableSmallRow(user) {
    let row = document.createElement("tr");
    let cellName = document.createElement("td");
    let cellBalance = document.createElement("td");

    cellName.append(document.createTextNode(user.name));
    cellBalance.append(document.createTextNode(user.balance));

    cellBalance.classList.add("w3-center");

    row.append(cellName, cellBalance);
    return row;
}

function createPaintingsTableRow(painting) {
    let row = document.createElement("tr");
    let cellTitle = document.createElement("td");
    let cellAuthor = document.createElement("td");
    let cellStartPrice = document.createElement("td");
    let cellPrice = document.createElement("td");
    let cellHolder = document.createElement("td");

    cellTitle.append(document.createTextNode(painting.title));
    cellAuthor.append(document.createTextNode(painting.author));
    cellStartPrice.append(document.createTextNode(painting.startPrice));
    cellPrice.append(document.createTextNode((painting.price)? painting.price : "-"));
    cellHolder.append(document.createTextNode((painting.holder)? painting.holder : "-"));

    cellStartPrice.classList.add("w3-center");
    cellPrice.classList.add("w3-center");
    cellHolder.classList.add("w3-center");

    row.append(cellTitle, cellAuthor, cellStartPrice, cellPrice, cellHolder);
    return row;
}