/**
 * A5Display - Crypto Widget
 * ES5 compatible for iOS 9 Safari
 * Uses Binance Public API
 */

(function() {
    'use strict';

    var btcElement = document.getElementById('price-btc');
    var ethElement = document.getElementById('price-eth');
    var usdcElement = document.getElementById('price-usdc');

    function formatCurrency(value) {
        var num = parseFloat(value);
        
        // Manual formatting for iOS 9 ES5 compatibility
        var parts = num.toFixed(2).split('.');
        var integerPart = parts[0];
        var decimalPart = parts[1];
        
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        
        return 'R$ ' + integerPart + ',' + decimalPart;
    }

    function fetchCrypto() {
        var url = '/api/crypto';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.timeout = 10000;

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    updatePrices(data);
                } catch (e) {
                    console.log('Erro no parser da Binance');
                }
            }
        };

        xhr.send();
    }

    function updatePrices(data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.symbol === 'BTCBRL' && btcElement) {
                btcElement.textContent = formatCurrency(item.price);
            } else if (item.symbol === 'ETHBRL' && ethElement) {
                ethElement.textContent = formatCurrency(item.price);
            } else if (item.symbol === 'USDCBRL' && usdcElement) {
                usdcElement.textContent = formatCurrency(item.price);
            }
        }
    }

    function init() {
        fetchCrypto();
        // Update every 30 seconds
        setInterval(fetchCrypto, 30000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
