/* globals describe it beforeEach before afterEach */

var should = require('should');
var LinkedList = require('../');

describe('List Node', function() {
    var list = null;

    before(function() {
        list = new LinkedList();
    });

    it('should have a working test environment', function() {
        true.should.equal(true);
    });

    it('should exist when instantiated', function() {
        var node = list.createNewNode('test data');
        should.exist(node);
        node.should.be.ok;
    });

    it('should return the correct (primitive) data', function() {
        var node = list.createNewNode('test data');
        var data = node.getData();
        data.should.not.be.an.Object;
        data.should.be.a.String;
        data.should.equal('test data');

        node.data = 42;
        data = node.getData();
        data.should.not.be.an.Object;
        data.should.be.a.Number;
        data.should.equal(42);

    });

    it('should return the correct (object) data', function() {
        var node = list.createNewNode({
            name: 'test item',
            number: 1
        });
        var data = node.getData();
        data.should.be.an.Object;
        node.toString().should.equal('{"name":"test item","number":1}');
    });

    it('should return whether or not it has a next node', function() {
        var firstNode = list.createNewNode('first node');
        var secondNode = list.createNewNode('second node');
        firstNode.next = secondNode;
        firstNode.hasNext().should.equal(true);
    });

    it('should return whether or not it has a previous node', function() {
        var firstNode = list.createNewNode('first node');
        var secondNode = list.createNewNode('second node');
        secondNode.prev = firstNode;
        secondNode.hasPrev().should.equal(true);
    });

    it('should return a proper string representation of its data', function() {
        var node = list.createNewNode({name: 'test item', number: 1});
        node.toString().should.equal('{"name":"test item","number":1}');

        node.data = 'string data';
        node.toString().should.equal('string data');

        node.data = 42;
        node.toString().should.equal('42');
    });
});
