//валидация мыла в модалке
function validateEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return true;
    return reg.test(email);
}
$(document).ready(function ($) {
//кнопка отправки заявки
    $("#feedbackform").submit(function () {
        return false;
    });
    $(".callback-bt-1").on("click", function () {
        var thisform = $("#"+this.parentElement.id);
        var emailval = thisform.find("input[name$='email']").val();
        var namevl = thisform.find("input[name$='name']").val();
        var phonevl = thisform.find("input[name$='phone']").val();
        var msgval = thisform.find("textarea[name$='message']").val();
        var msglen = msgval.length;
        var mailvalid = validateEmail(emailval);

        if (mailvalid == false) {
            thisform.find("input[name$='email']").addClass("error");
        }
        else if (mailvalid == true) {
            thisform.find("input[name$='email']").removeClass("error");
        }
        if (mailvalid == false) {
            thisform.find("input[name$='name']").addClass("error");
        }
        else if (mailvalid == true) {
            thisform.find("input[name$='name']").removeClass("error");
        }
        if (mailvalid == false) {
            thisform.find("input[name$='phone']").addClass("error");
        }
        else if (mailvalid == true) {
            thisform.find("input[name$='phone']").removeClass("error");
        }
        if (msglen < 4) {
            thisform.find("textarea[name$='message']").addClass("error");
        }
        else if (msglen >= 4) {
            thisform.find("textarea[name$='message']").removeClass("error");
        }
        alert(0);
        if (mailvalid == true && msglen >= 1) {
            alert(1);
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
    });
});