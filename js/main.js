$(document).ready(function ($) {
    $(".phone-mask").mask("+7 (999) 99-99-999");
    ymaps.ready(init);

    function init() {

        //путь до папки с темой
        var themePath = $('#ThemePath').val();

        var myMap;

        myMap = new ymaps.Map("map", {
            // center: [45.350958421605284, 39.05811229735281],
            center: [45.350938, 39.058148],
            zoom: 14,
            scroll: true,
            controls: []
        });

        myMap.behaviors.disable('scrollZoom');

        myMap.controls.add("zoomControl", {
            position: {top: 15, left: 15}
        });
        var placemark = new ymaps.Placemark(myMap.getCenter(), {
            // Зададим содержимое заголовка балуна.
            balloonContentHeader:  '<div class="content_map"> ' +'<span class="description text-center">Веб студия</span>' + '<a href = "#"> Originals</a><br>',
            // Зададим содержимое основной части балуна.
            balloonContentBody:
                '<img src="img/housJPG.JPG" height="150" width="200"> <br/> ' +
                '<table border="0" width="100%" cellpadding="5">' +
                '<tr>' +
                '<td>Старомышастовская</td>' +
                '<td><a href="tel:+79885242737">+7(988)52-42-737;</a></td>' +
                '</tr>'+'<tr>' +
                '<td> ул. Садовая 211 </td>' +
                '<td><a class="tel" href="tel:+79002475139">+7(900) 24-75-139</a></td>' +
                ' </tr>'+
                `<tr><td colspan="2"><a class="mail text-center" href="mailto:web-originals@yandex.ru">web-originals@yandex.ru</a></td></tr>` +
                `</table>`+
                `</div>`,
        });
        // Добавим метку на карту.
        myMap.geoObjects.add(placemark);
        // Откроем балун на метке.
        placemark.balloon.open();

        myMap.geoObjects.add(myPlacemark);


    }

});
