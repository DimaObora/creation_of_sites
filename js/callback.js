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
        var thisform = $("#" + this.parentElement.id);
        var st = thisform.serialize().split('&');
        var badfields = false;
        st.forEach(function (value){
            var valuesplit = value.split('=');
            if(valuesplit[1] == ''){
                badfields = true;
                if(valuesplit[0] == "g-recaptcha-response"){
                    alert("Необходимо пройти капчу");
                }else{
                    thisform.find("input[name$='"+valuesplit[0]+"']").addClass("error");
                }
            }else{
                thisform.find("input[name$='"+valuesplit[0]+"']").removeClass("error");
            }
        });
        if(badfields){
            grecaptcha.reset();
            return;
        }
        console.log();
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

        grecaptcha.reset();
    });
});