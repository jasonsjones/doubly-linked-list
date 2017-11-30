/* globals describe it beforeEach afterEach */

var should = require('should');
var LinkedList = require('../');

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

    it('should return an array of all the data in the list', function() {
        list.insert({
            id: 1,
            name: 'test item 1'
        });
        list.insert({
            id: 2,
            name: 'test item 2'
        });
        list.insert({
            id: 3,
            name: 'test item 3'
        });
        var listArray = list.toArray();
        listArray.should.be.an.Array;
        listArray.should.have.length(3);
    });

    describe('iterator functionality', function() {
        it('should exist when a list is instantiated', function() {
            list.iterator.should.be.ok;
        });

        it('should have iterator currentNode be null when first instantiated',
          function() {
              should.not.exist(list.iterator.next());
          });

        it('should return the tail node when iterator.last() is called', function() {
          populateList(list, 10);
          var last = list.iterator.last();
          last.should.equal(list.getTailNode());
        })

        it('should return the head node when iterator.first() is called',
          function() {
              populateList(list, 10);
              var first = list.iterator.first();
              first.should.equal(list.getHeadNode());
          });

        it('should return correct boolean value for hasNext()', function() {
            populateList(list, 3);
            list.iterator.reset();

            list.iterator.hasNext().should.equal(true);
            // get first element
            list.iterator.next();

            list.iterator.hasNext().should.equal(true);
            // get second element
            list.iterator.next();

            list.iterator.hasNext().should.equal(true);
            // get third element
            list.iterator.next();

            // should be no more element in list
            list.iterator.hasNext().should.equal(false);
        });

        it('should return correct boolean value for hasNext() in reverse order', function() {
          populateList(list, 3);
          list.iterator.reset_reverse();

          list.iterator.hasNext().should.equal(true);
          list.iterator.next_reverse();

          list.iterator.hasNext().should.equal(true);
          list.iterator.next_reverse();

          list.iterator.hasNext().should.equal(true);
          list.iterator.next_reverse();

          list.iterator.hasNext().should.equal(false);
        });

        it('should go through elements from head to tail when calling iterator.each()', function() {
          populateList(list, 3);
          var array = [];
          //expected result
          var expectedArray = ["test item 1", "test item 2", "test item 3"];
          var dummyCallback = function(node) {
            array.push(node.getData());
          }
          list.iterator.reset()
          list.iterator.each(dummyCallback);
          array.should.be.eql(expectedArray);
        });

        it('should go through elements from tail to head when calling iterator.each_reverse()', function() {
          populateList(list, 3);
          var array = [];
          var expectedArray = ["test item 3", "test item 2", "test item 1"];
          var dummyCallback = function(node) {
            array.push(node.getData());
          };
          list.iterator.reset_reverse();
          list.iterator.each_reverse(dummyCallback);
          array.should.be.eql(expectedArray);
        });

        it('should stop in the middle of iteration if iterator.interrupt() is called', function() {
          populateList(list, 5);
          var count = 0;
          var dummyCallback = function() {
            count += 1;
            if (count === 3) {
              list.iterator.interrupt();
            }
          };

          // head to tail
          list.iterator.reset();
          list.iterator.each(dummyCallback);
          count.should.be.equal(3);

          // tail to head
          count = 0;
          list.iterator.reset_reverse();
          list.iterator.each_reverse(dummyCallback);
          count.should.be.equal(3);
        })

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

        it('should insert item before a particular node', function () {
            populateList(list, 3);
            list.insert('test item 5');
            list.getSize().should.equal(4);

            list.insertBefore('test item 5', 'test item 4');
            list.getSize().should.equal(5);
            var node = list.findAt(3);
            node.getData().should.equal('test item 4');

            // test for inserting before the head node
            list.insertBefore('test item 1', 'test item 0');
            list.getSize().should.equal(6);
            node = list.getHeadNode();
            node.getData().should.equal('test item 0');
        });

        it('should insert item after a particular node', function () {
            populateList(list, 3);
            list.insert('test item 5');
            list.getSize().should.equal(4);

            list.insertAfter('test item 3', 'test item 4');
            list.getSize().should.equal(5);
            var node = list.findAt(3);
            node.getData().should.equal('test item 4');

            // test for inserting after the tail node
            list.insertAfter('test item 5', 'test item 6');
            list.getSize().should.equal(6);
            node = list.getTailNode();
            node.getData().should.equal('test item 6');
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

        it('should remove item from the front of a list with only one node', function () {
            list.insert('test item 1');
            var node = list.removeFirst();
            node.getData().should.equal('test item 1');
            list.getSize().should.equal(0);
        });

        it('should remove item at a particulary index', function() {
            populateList(list, 4);
            list.getSize().should.equal(4);
            var node = list.removeAt(1);
            node.getData().should.equal('test item 2');
            list.getSize().should.equal(3);
        });

        it('should remove a node with given data', function() {
            populateList(list, 4);
            list.getSize().should.equal(4);
            var node = list.removeNode('test item 3');
            node.getData().should.equal('test item 3');
            list.getSize().should.equal(3);
        });

    });

    describe('find functionality', function() {
        it('should find a node with the data provided', function() {
            populateList(list, 3);
            var node = list.find('test item 2');
            node.should.be.an.Object;
            node.getData().should.equal('test item 2');
        });

        it('should find a node with a complex obj', function () {
            list.insert({key: 'key', value: 'value123'});
            var node = list.find({key: 'key', value: 'value123'});
            node.getData().should.be.an.Object;
            node.getData().should.have.properties(['key', 'value']);
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
           'false otherwise',
                function () {
                    populateList(list, 3);
                    var result = list.contains('test item 2');
                    result.should.equal(true);

                    result = list.contains('not found');
                    result.should.equal(false);
                });
    });
});
