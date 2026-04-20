/**
 * A5Display - Clock Widget
 * ES5 compatible for iOS 9 Safari
 */

(function() {
    'use strict';

    var timeElement = document.getElementById('clock-time');
    var dateElement = document.getElementById('clock-date');

    var months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    var days = [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    function updateClock() {
        var now = new Date();

        // Time: HH:MM
        var hours = pad(now.getHours());
        var minutes = pad(now.getMinutes());
        var timeString = hours + ':' + minutes;

        // Date: Dia da semana, DD de Mês
        var dayName = days[now.getDay()];
        var date = now.getDate();
        var monthName = months[now.getMonth()];
        var dateString = dayName + ', ' + date + ' de ' + monthName;

        if (timeElement) {
            timeElement.textContent = timeString;
        }

        if (dateElement) {
            dateElement.textContent = dateString;
        }
    }

    function init() {
        updateClock();
        setInterval(updateClock, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
