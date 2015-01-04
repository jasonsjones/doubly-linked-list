/**
 * @fileOverview Implementation of a doubly linked-list data structure
 * @author Jason S. Jones
 * @version 0.0.1
 * @license MIT
 */

(function() {
    'use strict';

    /**************************************************
     * Linked list node class
     *
     * Internal private class to represent a node within
     * a linked list.  Each node has a 'data' property and
     * a pointer the previous node and the next node in the list.
     *
     * Since the 'Node' function is not assigned to
     * module.exports it is not visible outside of this
     * file, therefore, it is private to the LinkedList
     * class.
     *
     ***************************************************/

    /**
     * Creates a node object with a data property and pointer
     * to the next node
     *
     * @constructor
     * @param {object|number|string} data The data to initialize with the node
     */
    function Node(data) {
        this.data = data || null;
        this.next = null;
        this.prev = null;
    }

    // Functions attached to the Node prototype.  All node instances will
    // share these methods, meaning there will NOT be copies made for each
    // instance.  This will be a huge memory savings since there will likely
    // be a large number of individual nodes.
    Node.prototype = {

        /**
         * Returns whether or not the node has a pointer to the next node
         *
         * @returns {boolean} true if there is a next node; false otherwise
         */
        hasNext: function() {
            return (this.next !== null);
        },

        /**
         * Returns whether or not the node has a pointer to the previous node
         *
         * @returns {boolean} true if there is a previous node; false otherwise
         */
        hasPrev: function() {
            return (this.prev !== null);
        },

        /**
         * Returns the data of the the node
         *
         * @returns {object|string|number} the data of the node
         */
        getData: function() {
            return this.data;
        },

        /**
         * Returns a string represenation of the node.  If the data is an
         * object, it returns the JSON.stringify version of the object.
         * Otherwise, it simply returns the data
         *
         * @return {string} the string represenation of the node data
         */
        toString: function() {
            if (typeof this.data === 'object') {
                return JSON.stringify(this.data);
            } else {
                return String(this.data);
            }
        }
    };

    /**************************************************
     * Doubly linked list class
     *
     * Implementation of a doubly linked list data structure.  This
     * implementation provides the general functionality of adding nodes to
     * the front or back of the list, as well as removing node from the front
     * or back.  This functionality enables this implemention to be the
     * underlying data structure for the more specific stack or queue data
     * structure.
     *
     ***************************************************/

    /**
     * Creates a LinkedList instance.  Each instance has a head node, a tail
     * node and a size, which represents the number of nodes in the list.
     *
     * @constructor
     */
    function DoublyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Functions attached to the Linked-list prototype.  All linked-list
    // instances will share these methods, meaning there will NOT be copies
    // made for each instance.  This will be a huge memory savings since there
    // may be several different linked lists.
    DoublyLinkedList.prototype = {

        /**
         * Creates a new Node object with 'data' assigned to the node's data
         * property
         *
         * @param {object|string|number} data The data to initialize with the
         *                                    node
         * @returns {object} Node object intialized with 'data'
         */
        createNewNode: function(data) {
            return new Node(data);
        },

        /**
         * Returns the first node in the list, commonly referred to as the
         * 'head' node
         *
         * @returns {object} the head node of the list
         */
        getHeadNode: function() {
            return this.head;
        },

        /**
         * Returns the last node in the list, commonly referred to as the 
         * 'tail'node
         *
         * @returns {object} the tail node of the list
         */
        getTailNode: function() {
            return this.tail;
        },

        /**
         * Determines if the list is empty
         *
         * @returns {boolean} true if the list is empty, false otherwise
         */
        isEmpty: function() {
            return (this.size === 0);
        },

        /**
         * Returns the size of the list, or number of nodes
         *
         * @returns {number} the number of nodes in the list
         */
        getSize: function() {
            return this.size;
        },

        /**
         * Clears the list of all nodes/data
         */
        clear: function () {
            //while (!this.isEmpty()) {
                //this.removeFirst();
            //}
        },

        //################## INSERT methods ####################

        /**
         * Inserts a node with the provided data to the end of the list
         *
         * @param {object|string|number} data The data to initialize with the
         *                                    node
         * @returns {boolean} true if insert operation was successful
         */
        insert: function(data) {
            var newNode = this.createNewNode(data);
            if (this.isEmpty()) {
                this.head = this.tail = newNode;
            } else {
                this.tail.next = newNode;
                newNode.prev = newNode;
                this.tail = newNode;
            }
            this.size += 1;

            return true;
        }
    };

    module.exports = DoublyLinkedList;

})();
