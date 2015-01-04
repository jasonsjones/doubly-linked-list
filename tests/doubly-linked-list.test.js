/* globals describe it beforeEach afterEach */

var should = require('should');
var LinkedList = require('../doubly-linked-list');

describe('Linked List', function() {
    var list = null;

    beforeEach(function() {
        list = new LinkedList();
    });

    afterEach(function() {
        list = null;
    });

    it('should have a working test environment', function() {
        true.should.equal(true);
    });

    it('should initially contain zero items', function() {
        list.isEmpty().should.equal(true);
        list.getSize().should.equal(0);
    });
});

