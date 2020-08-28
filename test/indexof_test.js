const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

describe('Test Array assert', function() {
  describe('#indexOf()', function() {
    it('debe retornar -1 cuando el valor no esta presente', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });

    it('debe retornar la primera ocurrencia del valor especificado', function() {
      assert.equal([1,2,3].indexOf(3), 2);
    });
  });
});

describe('Test Array should', function() {
    describe('#indexOf()', function() {
      it('debe retornar -1 cuando el valor no esta presente', function() {
          let result = [1,2,3].indexOf(4);
          result.should.be.equal(-1);
      });
    });
});

describe('Test Array should', function() {
    describe('#indexOf()', function() {
      it('debe retornar -1 cuando el valor no esta presente', function() {
          let result = [1,2,3].indexOf(4);
          expect(result).to.equal(-1);
      });
    });
});