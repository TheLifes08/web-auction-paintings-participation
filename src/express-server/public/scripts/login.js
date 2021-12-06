$(document).ready(() => {
    $("#form-message-close").on("click", () => {
        $("#form-message").css("display", "none");
    });

    $("#submit-button").on("click", () => {
        let username = $("#username-input").val();
        let password = $("#password-input").val();

        $.post("/login", {"username": username, "password": password}).done((data) => {
            if (data) {
                if (data.error) {
                    showError(data.message);
                } else {
                    window.location.href = "/";
                }
            }
        });
    });
});

function showError(text) {
    $("#form-message-p").text(text);
    $("#form-message").css("display", "block");
}