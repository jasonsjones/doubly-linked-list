/* globals describe it beforeEach afterEach */

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
            name: "test item",
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
        var node = list.createNewNode({name: "test item", number: 1});
        node.toString().should.equal('{"name":"test item","number":1}');

        node.data = 'string data';
        node.toString().should.equal('string data');

        node.data = 42;
        node.toString().should.equal('42');
    });
});

describe('Linked List', function() {
    var list = null;

    // Utility function to populate the list with dummy data.
    // The number of nodes added will be specified by the 'numNodes'
    // parameter.
    var populateList = function (aList, numNodes) {
        for (var i = 0; i < numNodes; i++) {
            aList.insert('test item ' + (i + 1));
        }
    };

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

    it('should clear the list and set head and tail to null', function () {
        populateList(list, 10);
        list.getSize().should.equal(10);
        list.clear();
        list.getSize().should.equal(0);
        should.not.exist(list.getHeadNode());
        should.not.exist(list.getTailNode());
    });

    describe('insert functionality', function() {
        it('should set the head node equal to the tail node when first item ' +
           'is inserted', function() {
            list.insert('test item 1');
            list.getHeadNode().should.equal(list.getTailNode());
            list.getSize().should.equal(1);
        });

        it('should insert items to the back of the list', function() {
            populateList(list, 5);
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(5);
            var tail = list.getTailNode();
            tail.getData().should.equal('test item 5');
        });

        it('should insert items to the front of the list', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insertFirst('new item 0');
            list.getHeadNode().data.should.equal('new item 0');
            list.getHeadNode().hasPrev().should.equal(false);
            list.getSize().should.equal(3);
        });

    });

    describe('remove functionality', function() {
        it('should return null if remove is called on an empty list', function() {
            var node = list.remove();
            should.not.exist(node);
        });

        it('should remove items from the back of the list', function() {
            populateList(list, 3);
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
            var node = list.remove();
            node.getData().should.equal('test item 3');
            list.getTailNode().getData().should.equal('test item 2');
            list.getSize().should.equal(2);
        });
    });
});

