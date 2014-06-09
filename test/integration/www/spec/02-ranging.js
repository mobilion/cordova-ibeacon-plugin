'use strict';

describe('ranging', function() {

  var region = new ibeacon.Region({
    identifier: 'monitoring-test',
    uuid: uuid.v4(),
  });

  var tolerance;

  beforeEach(function() {
    tolerance = 1;
  });

  afterEach(clean);

});
