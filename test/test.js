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

        it('should insert item at a particular index', function() {
            populateList(list, 3);
            list.insert('test item 5');
            list.getSize().should.equal(4);
            var success = list.insertAt(3, 'test item 4');
            success.should.equal(true);
            list.getSize().should.equal(5);
            var node = list.findAt(3);
            node.getData().should.equal('test item 4');
        });

        it('should insert new head node when inserting at index 0', function() {
            populateList(list, 3);
            list.getSize().should.equal(3);
            var success = list.insertAt(0, 'test item 0');
            success.should.equal(true);
            list.getSize().should.equal(4);
            var node = list.getHeadNode();
            node.getData().should.equal('test item 0');
        });

        it('should return false when trying to insert at index out of bounds', function() {
            populateList(list, 3);
            var success = list.insertAt(5, 'test item 4');
            success.should.equal(false);
        });
    });

    describe('remove functionality', function() {
        it('should return null if remove is called on an empty list',
           function() {
            var node = list.remove();
            should.not.exist(node);
        });

        it('should remove items from the back of the list', function() {
            populateList(list, 3);
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
            var node = list.remove();
            node.getData().should.equal('test item 3');
            list.getSize().should.equal(2);
            var last = list.getTailNode();
            last.getData().should.equal('test item 2');
            last.hasNext().should.equal(false);
        });

        it('should return null if removeFirst is called on an empty list',
           function() {
            var node = list.removeFirst();
            should.not.exist(node);
        });

        it('should remove items from the front of the list', function() {
            populateList(list, 3);
            list.isEmpty().should.equal(false);
            list.getSize().should.equal(3);
            var node = list.removeFirst();
            node.getData().should.equal('test item 1');
            list.getSize().should.equal(2);
            var first = list.getHeadNode();
            first.getData().should.equal('test item 2');
            first.hasPrev().should.equal(false);
        });

    });

    describe('find functionality', function() {
        it('should find a node with the data provided', function() {
            populateList(list, 3);
            var node = list.find('test item 2');
            node.should.be.an.Object;
            node.getData().should.equal('test item 2');
        });

        it('should return -1 if a node does not exist with the given data',
            function() {
                populateList(list, 3);
                var node = list.find('not found...');
                node.should.not.be.an.Object;
                node.should.equal(-1);
        });

        it('should return -1 if find() is called on an empty list',
            function() {
                var node = list.find('not found...');
                node.should.not.be.an.Object;
                node.should.equal(-1);
        });

        it('should return the index of node containing the provided data',
            function() {
                populateList(list, 3);
                var index = list.indexOf('test item 1');
                index.should.equal(0);

                index = list.indexOf('test item 2');
                index.should.equal(1);

                index = list.indexOf('test item 3');
                index.should.equal(2);
        });

        it('should return -1 for the index of node with the given data if the' +
           'node does not exist',
               function() {
                   populateList(list, 3);
                   var index = list.indexOf('not found');
                   index.should.equal(-1);
        });

        it('should return node at given index', function() {
            list.insert('test item 1');
            list.insert('test item 2');
            var node = list.findAt(0);
            node.should.be.an.Object;
            node.getData().should.equal('test item 1');

            node = list.findAt(1);
            node.should.be.an.Object;
            node.getData().should.equal('test item 2');
        });

        it('should return -1 when findAt() is called w/ index > than list size',
            function() {
                var node = list.findAt(0);
                node.should.not.be.an.Object;
                node.should.equal(-1);
        });

        it('should return true if list contains specified data,' +
            'false otherwise', function () {
                populateList(list, 3);
                var result = list.contains('test item 2');
                result.should.equal(true);

                result = list.contains('not found');
                result.should.equal(false);
        });
    });
});

