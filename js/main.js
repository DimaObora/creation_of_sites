$(document).ready(function ($) {
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
            balloonContentHeader: '<span class="description text-center">веб студия</span>' + '<a href = "#"> originals</a><br>',
            // Зададим содержимое основной части балуна.
            balloonContentBody: '<img src="img/housJPG.JPG" height="150" width="200"> <br/> ' +
                '<a href="tel:+79885242737"">+7(988)52-42-737&nbsp;&nbsp;&nbsp;</a>'+'<a class="tel" href="tel:+79002475139">+7(900) 24-75-139</a>',
            // Зададим содержимое нижней части балуна.
            balloonContentFooter: 'Старомышастовская  ул. Садовая, 211 ',
            // Зададим содержимое всплывающей подсказки.
            hintContent: 'Рога и копыта'
        });
        // Добавим метку на карту.
        myMap.geoObjects.add(placemark);
        // Откроем балун на метке.
        placemark.balloon.open();
        // var html = '<div class="popup">';
        // html += '<img src="img/housJPG.jpg" alt="" />';
        // html += '<div class="popup-text">';
        // html += '<p>Старомышастовская <br> ул. Садовая, 211 <br> <a class="tel" href="tel:+79885242737">+79885242737</a>&nbsp;&nbsp;&nbsp;<a class="tel" href="tel:+79002475139">+79002475139</a></p>';
        // html += '</div>';
        // html += '</div>';

        // var myPlacemark = new ymaps.Placemark([45.350938, 39.058148], {
        //         balloonContent: html
        //     },
        //     {
        //         iconLayout: 'default#image',
        //         iconImageHref: 'img/icon.png',
        //         iconImageSize: [50, 50],
        //         iconImageOffset: [-33, -50],
        //         balloonShadow: false
        //     });


        myMap.geoObjects.add(myPlacemark);

    }

});
