/**
 * A5Display - Weather Widget
 * ES5 compatible for iOS 9 Safari
 * Uses Open-Meteo API (free, no key required)
 */

(function() {
    'use strict';

    var tempElement = document.getElementById('weather-temp');
    var descElement = document.getElementById('weather-desc');
    var iconElement = document.getElementById('weather-icon');

    // WMO Weather interpretation codes
    var weatherCodes = {
        0: { icon: '☀️', desc: 'Céu limpo' },
        1: { icon: '🌤️', desc: 'Parcialmente nublado' },
        2: { icon: '⛅', desc: 'Nublado' },
        3: { icon: '☁️', desc: 'Encoberto' },
        45: { icon: '🌫️', desc: 'Neblina' },
        48: { icon: '🌫️', desc: 'Neblina com gelo' },
        51: { icon: '🌧️', desc: 'Garoa leve' },
        53: { icon: '🌧️', desc: 'Garoa' },
        55: { icon: '🌧️', desc: 'Garoa intensa' },
        61: { icon: '🌧️', desc: 'Chuva leve' },
        63: { icon: '🌧️', desc: 'Chuva' },
        65: { icon: '🌧️', desc: 'Chuva intensa' },
        71: { icon: '🌨️', desc: 'Neve leve' },
        73: { icon: '🌨️', desc: 'Neve' },
        75: { icon: '🌨️', desc: 'Neve intensa' },
        95: { icon: '⛈️', desc: 'Tempestade' },
        96: { icon: '⛈️', desc: 'Tempestade com granizo' },
        99: { icon: '⛈️', desc: 'Tempestade com granizo' }
    };

    function getWeatherIcon(code) {
        var weather = weatherCodes[code];
        return weather ? weather.icon : '❓';
    }

    function getWeatherDesc(code) {
        var weather = weatherCodes[code];
        return weather ? weather.desc : 'Desconhecido';
    }

    function fetchWeather() {
        // São Paulo coordinates - Usando HTTP em vez de HTTPS por causa dos certificados antigos do iOS 9
        var lat = -23.5505;
        var lon = -46.6333;
        // iOS 9 pode falhar com Let's Encrypt certificates (muitos venceram).
        // A Open-Meteo as vezes redireciona http pra https, então vamos tentar uma API alternativa 
        // ou fazer um workaround. Primeiro, testaremos via proxy cors (sem SSL rigoroso) ou uma URL que sabidamente suporte TLS antigo
        var url = 'http://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true&timezone=America%2FSao_Paulo';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.timeout = 10000;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        updateWeather(data);
                    } catch (e) {
                        showError('Erro ao processar dados');
                    }
                } else {
                    showError('Erro na conexão');
                }
            }
        };

        xhr.onerror = function() {
            showError('Erro na rede');
        };

        xhr.ontimeout = function() {
            showError('Timeout');
        };

        xhr.send();
    }

    function updateWeather(data) {
        if (!data || !data.current_weather) {
            showError('Dados inválidos');
            return;
        }

        var current = data.current_weather;
        var temp = Math.round(current.temperature);
        var code = current.weathercode;

        if (tempElement) {
            tempElement.textContent = temp + '°';
        }

        if (descElement) {
            descElement.textContent = getWeatherDesc(code);
        }

        if (iconElement) {
            iconElement.textContent = getWeatherIcon(code);
        }
    }

    function showError(message) {
        if (tempElement) {
            tempElement.textContent = '--°';
        }
        if (descElement) {
            descElement.textContent = message;
        }
        if (iconElement) {
            iconElement.textContent = '⚠️';
        }
    }

    function init() {
        fetchWeather();
        // Update every 10 minutes
        setInterval(fetchWeather, 600000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
