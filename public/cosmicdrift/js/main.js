/* ============================================================
   CosmicDrift - main.js
   Entry point: initializes all modules and starts the game
   ============================================================ */

(function () {
  'use strict';

  // ----------------------------------------------------------
  // Wait for DOM, then initialize
  // ----------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    console.log('CosmicDrift v2.0 - Initializing...');

    // Initialize audio and UI first
    Audio.init();
    UI.init();

    // Start title screen animation
    UI.initTitleAnimation();

    // Set initial state
    Game.STATE.phase = 'title';

    // Listen for game start to initialize renderer
    Game.on('game:start', function () {
      // Small delay to ensure canvas is visible in DOM
      setTimeout(function () {
        Renderer.init();
        StarMap.updateVisibility();
      }, 100);
    });

    console.log('CosmicDrift initialized. Ready to play.');
  });
})();
