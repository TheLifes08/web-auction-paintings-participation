$(document).ready(() => {
    $("#form-message-close").on("click", () => {
        $("#form-message").css("display", "none");
    });

    $("#submit-button").on("click", () => {
        let username = $("#username-input").val();
        let password = $("#password-input").val();

        $.post("/storage/users", {"username": username, "password": password}).done((data) => {
            if (data) {
                showMessage(data.message, data.error);
            }
        });
    });
});

function showMessage(text, error) {
    let form = $("#form-message");

    $("#form-message-p").text(text);

    if (error) {
        form.addClass("w3-red");
        form.removeClass("w3-green");
    } else {
        form.addClass("w3-green");
        form.removeClass("w3-red");
    }

    form.css("display", "block");
}