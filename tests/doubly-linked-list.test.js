/* globals describe it beforeEach afterEach */
/* jshint expr: true */

var should = require('should');
var LinkedList = require('../doubly-linked-list');

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

