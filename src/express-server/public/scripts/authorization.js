$(function () {
    $("#submit-button").on("click", () => {
       authorize();
    });
});

function authorize() {
    let username = $('#username-input').val();

    $.post("/authorization", { username, "password": password }).done((data) => {
        if (data) {
            showMessage(data.message, data.error);
        }
    });

    if (name === 'admin') {
        window.location.href = '/admin/adm_state'
    } else {
        console.log(name)
        $.get(`/auth/${name}`)
            .done((data) => {
                let obj = JSON.parse(data);
                if (obj) {
                    window.location.href = `/users/page/${obj.id}`
                } else {
                    $('#warning').css('display', 'block')
                }
            })
    }
}