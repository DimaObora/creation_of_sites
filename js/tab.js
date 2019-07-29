$(document).ready(function () {
    //клик по ссылкам верхнего уровня
    $('.accordeon_trigger').on('click', function (e) {
        // запрещает дефолдное действие эл. переход по ссылке
        e.preventDefault();

        // сохраняем переменные
        var $this = $(this),
            //сохраняем меню верхнего уровня
            item = $this.closest('.accordeon_item'),
            //сохраняем весь наш список, почему через this , т.к кардионов можно было ставить несколько на страницу
            list = $this.closest('.accordeon_list'),
            //сохраняем все li верхнего уровня
            items = list.find('.accordeon_item'),
            //сохраняем контент который будет открываться внутренний список
            content = item.find('.accordeon_inner'),
            //сохраним контент в остальных li
            otherContent = list.find('.accordeon_inner'),
            // время анимации
            duration =  300;

        // проверяем при нажатии , нет ли li  активного класс, если нет , то повесим
        if (!item.hasClass('active')){
            //определяем закрытую li
            items.removeClass('active');
            // определяем открытую li
            item.addClass('active');

            // сначало закрываем
            otherContent.stop(true, true).slideUp(duration);
            // открывает
            content.stop(true, true).slideDown(duration);
        }
        //если клас уже есть , то надо li закрыть
        else {
            content.stop(true, true).slideUp(duration);
            // удалим класс
            item.stop(true, true).removeClass('active');

        }


    });
});