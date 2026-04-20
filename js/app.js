/**
 * A5Display - Main Application
 * ES5 compatible for iOS 9 Safari
 */

(function() {
    'use strict';

    // Performance monitoring
    var fps = 0;
    var lastTime = performance.now();
    var frameCount = 0;
    var fpsElement = document.getElementById('fps');
    var memoryElement = document.getElementById('memory');

    function updateFPS() {
        var now = performance.now();
        frameCount++;

        if (now - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = now;

            if (fpsElement) {
                fpsElement.textContent = fps;
            }
        }

        requestAnimationFrame(updateFPS);
    }

    function updateMemory() {
        if (memoryElement && window.performance && window.performance.memory) {
            var used = Math.round(window.performance.memory.usedJSHeapSize / 1048576);
            memoryElement.textContent = used + ' MB';
        } else if (memoryElement) {
            memoryElement.textContent = 'N/A';
        }
    }

    // Initialize
    function init() {
        updateFPS();
        setInterval(updateMemory, 5000);
        updateMemory();
        
        // Touch to refresh (for Home Screen mode)
        document.body.addEventListener('click', function() {
            window.location.reload(true);
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
