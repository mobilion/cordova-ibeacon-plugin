'use strict';

var loadTests = function() {

  mocha.checkLeaks();
  mocha.run();

};

document.addEventListener('deviceready', loadTests, false);
