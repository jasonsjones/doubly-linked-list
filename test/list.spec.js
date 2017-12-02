/* globals describe it beforeEach afterEach */

var chai = require('chai');
var LinkedList = require('../');

var expect = chai.expect;

describe('Linked List', function () {
    var list = null;

    // Utility function to populate the list with dummy data.
    // The number of nodes added will be specified by the 'numNodes'
    // parameter.
    var populateList = function (aList, numNodes) {
        for (var i = 0; i < numNodes; i++) {
            aList.insert('test item ' + (i + 1));
        }
    };

    beforeEach(function () {
        list = new LinkedList();
    });

    afterEach(function () {
        list = null;
    });

    it('initially contains zero items', function () {
        expect(list.isEmpty()).to.be.true
        expect(list.getSize()).to.equal(0);
    });

    it('clears the list and set head and tail to null', function () {
        populateList(list, 10);
        expect(list.getSize()).to.equal(10);
        list.clear();
        expect(list.getSize()).to.equal(0);
        expect(list.getHeadNode()).to.not.exist;
        expect(list.getTailNode()).to.not.exist;
    });

    it('returns an array of all the data in the list', function () {
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
        expect(listArray).to.be.an('array');
        expect(listArray.length).to.equal(3);
    });

    describe('iterator functionality', function () {
        it('exists when a list is instantiated', function () {
            expect(list.iterator).to.exist
        });

        it('iterator currentNode is null when first instantiated',
          function () {
              expect(list.iterator.next()).to.not.exist;
          });

        it('returns the tail node when iterator.last() is called', function () {
          populateList(list, 10);
          var last = list.iterator.last();
          expect(last).to.equal(list.getTailNode());
        })

        it('returns the head node when iterator.first() is called',
          function () {
              populateList(list, 10);
              var first = list.iterator.first();
              expect(first).to.equal(list.getHeadNode());
          });

        it('returns correct boolean value for hasNext()', function () {
            populateList(list, 3);
            list.iterator.reset();

            expect(list.iterator.hasNext()).to.be.true;
            // get first element
            list.iterator.next();

            expect(list.iterator.hasNext()).to.be.true;
            // get second element
            list.iterator.next();

            expect(list.iterator.hasNext()).to.be.true;
            // get third element
            list.iterator.next();

            // should be no more element in list
            expect(list.iterator.hasNext()).to.be.false;
        });

        it('returns correct boolean value for hasNext() in reverse order', function () {
            populateList(list, 3);
            list.iterator.reset_reverse();

            expect(list.iterator.hasNext()).to.be.true;
            list.iterator.next_reverse();

            expect(list.iterator.hasNext()).to.be.true;
            list.iterator.next_reverse();

            expect(list.iterator.hasNext()).to.be.true;
            list.iterator.next_reverse();

            expect(list.iterator.hasNext()).to.be.false;
        });

        it('iterates through elements from head to tail when calling iterator.each()', function () {
            populateList(list, 3);
            var array = [];
            //expected result
            var expectedArray = ['test item 1', 'test item 2', 'test item 3'];
            var dummyCallback = function (node) {
                array.push(node.getData());
            }
            list.iterator.reset()
            list.iterator.each(dummyCallback);
            expect(array).to.eql(expectedArray);
        });

        it('iterates through elements from tail to head when calling iterator.each_reverse()', function () {
            populateList(list, 3);
            var array = [];
            var expectedArray = ['test item 3', 'test item 2', 'test item 1'];
            var dummyCallback = function (node) {
                array.push(node.getData());
            };
            list.iterator.reset_reverse();
            list.iterator.each_reverse(dummyCallback);
            expect(array).to.eql(expectedArray);
        });

        it('stops in the middle of iteration if iterator.interrupt() is called', function () {
            populateList(list, 5);
            var count = 0;
            var dummyCallback = function () {
                count += 1;
                if (count === 3) {
                    list.iterator.interrupt();
                }
            };

            // head to tail
            list.iterator.reset();
            list.iterator.each(dummyCallback);
            expect(count).to.equal(3);

            // tail to head
            count = 0;
            list.iterator.reset_reverse();
            list.iterator.each_reverse(dummyCallback);
            expect(count).to.equal(3);
        });
    });

    describe('insert functionality', function () {
        it('sets the head node equal to the tail node when first item ' +
           'is inserted', function () {
            list.insert('test item 1');
            expect(list.getHeadNode()).to.eql(list.getTailNode());
            expect(list.getSize()).to.equal(1);
        });

        it('inserts items to the back of the list', function () {
            populateList(list, 5);
            expect(list.isEmpty()).to.be.false;
            expect(list.getSize()).to.equal(5);
            var tail = list.getTailNode();
            expect(tail.getData()).to.equal('test item 5');
        });

        it('inserts items to the front of the list', function () {
            list.insert('test item 1');
            list.insert('test item 2');
            list.insertFirst('new item 0');
            expect(list.getHeadNode().data).to.equal('new item 0');
            expect(list.getHeadNode().hasPrev()).to.be.false;
            expect(list.getSize()).to.equal(3);
        });

        it('inserts item at a particular index', function () {
            populateList(list, 3);
            list.insert('test item 5');
            expect(list.getSize()).to.equal(4);
            var success = list.insertAt(3, 'test item 4');
            expect(success).to.be.true;
            expect(list.getSize()).to.equal(5);
            var node = list.findAt(3);
            expect(node.getData()).to.equal('test item 4');
        });

        it('inserts new head node when inserting at index 0', function () {
            populateList(list, 3);
            expect(list.getSize()).to.equal(3);
            var success = list.insertAt(0, 'test item 0');
            expect(success).to.be.true;
            expect(list.getSize()).to.equal(4);
            var node = list.getHeadNode();
            expect(node.getData()).to.equal('test item 0');
        });

        it('returns false when trying to insert at index out of bounds', function () {
            populateList(list, 3);
            var success = list.insertAt(5, 'test item 4');
            expect(success).to.be.false;
        });

        it('inserts item before a particular node', function () {
            populateList(list, 3);
            list.insert('test item 5');
            expect(list.getSize()).to.equal(4);

            list.insertBefore('test item 5', 'test item 4');
            expect(list.getSize()).to.equal(5);
            var node = list.findAt(3);
            expect(node.getData()).to.equal('test item 4');

            // test for inserting before the head node
            list.insertBefore('test item 1', 'test item 0');
            expect(list.getSize()).to.equal(6);
            node = list.getHeadNode();
            expect(node.getData()).to.equal('test item 0');
        });

        it('inserts item after a particular node', function () {
            populateList(list, 3);
            list.insert('test item 5');
            expect(list.getSize()).to.equal(4);

            list.insertAfter('test item 3', 'test item 4');
            expect(list.getSize()).to.equal(5);
            var node = list.findAt(3);
            expect(node.getData()).to.equal('test item 4');

            // test for inserting after the tail node
            list.insertAfter('test item 5', 'test item 6');
            expect(list.getSize()).to.equal(6);
            node = list.getTailNode();
            expect(node.getData()).to.equal('test item 6');
        });
    });

    describe('remove functionality', function () {
        it('returns null if remove is called on an empty list',
           function () {
            var node = list.remove();
            expect(node).to.not.exist;
        });

        it('removes items from the back of the list', function () {
            populateList(list, 3);
            expect(list.isEmpty()).to.be.false;
            expect(list.getSize()).to.equal(3);
            var node = list.remove();
            expect(node.getData()).to.equal('test item 3');
            expect(list.getSize()).to.equal(2);
            var last = list.getTailNode();
            expect(last.getData()).to.equal('test item 2');
            expect(last.hasNext()).to.be.false;
        });

        it('returns null if removeFirst is called on an empty list',
           function () {
            var node = list.removeFirst();
            expect(node).to.not.exist;
        });

        it('removes items from the front of the list', function () {
            populateList(list, 3);
            expect(list.isEmpty()).to.be.false;
            expect(list.getSize()).to.equal(3);
            var node = list.removeFirst();
            expect(node.getData()).to.equal('test item 1');
            expect(list.getSize()).to.equal(2);
            var first = list.getHeadNode();
            expect(first.getData()).to.equal('test item 2');
            expect(first.hasPrev()).to.be.false;
        });

        it('removes item from the front of a list with only one node', function () {
            list.insert('test item 1');
            var node = list.removeFirst();
            expect(node.getData()).to.equal('test item 1');
            expect(list.getSize()).to.equal(0);
        });

        it('removes item at a particulary index', function () {
            populateList(list, 4);
            expect(list.getSize()).to.equal(4);
            var node = list.removeAt(1);
            expect(node.getData()).to.equal('test item 2');
            expect(list.getSize()).to.equal(3);
        });

        it('removes a node with given data', function () {
            populateList(list, 4);
            expect(list.getSize()).to.equal(4);
            var node = list.removeNode('test item 3');
            expect(node.getData()).to.equal('test item 3');
            expect(list.getSize()).to.equal(3);
        });

    });

    describe('find functionality', function () {
        it('finds a node with the data provided', function () {
            populateList(list, 3);
            var node = list.find('test item 2');
            expect(node).to.be.an('object');
            expect(node.getData()).to.equal('test item 2');
        });

        it('finds a node with a complex obj', function () {
            list.insert({key: 'key', value: 'value123'});
            var node = list.find({key: 'key', value: 'value123'});
            expect(node).to.be.an('object');
            expect(node.getData()).to.have.property('value');
            expect(node.getData()).to.have.property('key');
        });

        it('returns -1 if a node does not exist with the given data',
            function () {
                populateList(list, 3);
                var node = list.find('not found...');
                expect(node).to.not.be.an('object');
                expect(node).to.equal(-1);
            });

        it('returns -1 if find() is called on an empty list',
            function () {
                var node = list.find('not found...');
                expect(node).to.not.be.an('object');
                expect(node).to.equal(-1);
            });

        it('returns the index of node containing the provided data',
            function () {
                populateList(list, 3);
                var index = list.indexOf('test item 1');
                expect(index).to.equal(0);

                index = list.indexOf('test item 2');
                expect(index).to.equal(1);

                index = list.indexOf('test item 3');
                expect(index).to.equal(2);
            });

        it('returns -1 for the index of node with the given data if the' +
           'node does not exist',
                function () {
                    populateList(list, 3);
                    var index = list.indexOf('not found');
                    expect(index).to.equal(-1);
                });

        it('returns node at given index', function () {
            list.insert('test item 1');
            list.insert('test item 2');
            var node = list.findAt(0);
            expect(node).to.be.an('object');
            expect(node.getData()).to.equal('test item 1');

            node = list.findAt(1);
            expect(node).to.be.an('object');
            expect(node.getData()).to.equal('test item 2');
        });

        it('returns -1 when findAt() is called w/ index > than list size',
            function () {
                var node = list.findAt(0);
                expect(node).to.not.be.an('object');
                expect(node).to.equal(-1);
            });

        it('returns true if list contains specified data; false otherwise',
            function () {
                populateList(list, 3);
                var result = list.contains('test item 2');
                expect(result).to.be.true;

                result = list.contains('not found');
                expect(result).to.be.false;
            });
    });
});
