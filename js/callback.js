//валидация мыла в модалке
function validateEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return true;
    return reg.test(email);
}
$(document).ready(function ($) {
//кнопка отправки заявки
    $(".nosumbit").submit(function () {
        return false;
    });
    $(".callback-bt-1").on("click", function () {
        var thisform = $("#"+this.parentElement.id);
        var emailval = thisform.find("input[name$='email']").val();
        var namevl = thisform.find("input[name$='name']").val();
        var phonevl = thisform.find("input[name$='phone']").val();
        var msgval = thisform.find("textarea[name$='message']").val();
        var mailvalid = validateEmail(emailval);

        if (mailvalid == true ) {
            console.log(thisform.serialize());
            $.ajax({
                type: 'POST',
                url: 'callback.php',
                data: thisform.serialize(),
                success: function (data) {
                    alert("Отправленно!");
                    console.log(data);
                },
                error: function (data) {
                    alert("Ошибка!");
                    console.log(data);
                }
            }).done(function (data) {
                console.log(data);
            });
        }
        grecaptcha.reset();
    });
});