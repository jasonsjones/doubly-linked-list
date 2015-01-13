[![Build Status][travis-image]][travis-url] [![dependency status][dm-url]][dm-image]

# Doubly Linked List

## Description

This is a javascript implementation of a [doubly linked
list](http://en.wikipedia.org/wiki/Linked_list) data structure.

In simple terms, a doubly linked list consists of one or more 'nodes'.  Each
node has a data field (which can contain any data--a primative value or complex
object) and a pointer to the next 'node' and the previous 'node'. This
additional pointer to the previous node is what distinguishes a doubly linked
list from a singly linked list--a singly linked list only contains a pointer,
or reference, to the next node.  The major advantage to having pointers to
both the next and previous node is that the list can be traversed in both
directions, as well as making operations that operate on the 'middle' of
the list a bit more efficient since each node has a reference the one
before it and the one after it.  The idea of having a links to the
previous and next nodes is where this data structure got its descriptive
name.

This implementation provides basic functionality of adding nodes to the front or
back of the list, as well as the ability to insert a node at a given position
in the list.  It also provides the ability to remove nodes at the front or back
of the list, or from any given position.

The find, or search, functionality provides the ability to find the first node
containing specified data. It also provides the ability to find a node given a
specific position, or index, in the list.

### Advantages

- List will grow dynamically with each node added; no requirement to
  'resize' list when it reaches a certain size, saving considerable overhead
  in 'house-keeping' operations.
- Flexibility to add or remove nodes at the beginning or end of the list in
  O(1) time.  This is a significant improvement over its
  [singly linked list](https://github.com/jasonsjones/singly-linked-list)
  counterpart.

*For specific examples and documentation, see the below sections*

### Motivation:

The main purpose of this project is revisit the basics, and focus on the
development process.

*I wholehearedly acknowledge that the basic data structure space is populated
with well-written code and efficient implementations, and one could easily grab
one of those libraries and integrate it in their project.  However, the main
difference between those libraries/implementations and this one is that this is
the best implementation I have ever written.  My hope is that someone else will
find this useful, but understand, this code is not the goal; this will simply
be a useful bi-product of the journey.  The underlying motivation is to
understand and, more importantly, learn from the process to get to the desired
end-state&mdash;for me it is all about the joy of the journey.*

#### Environment:

Although this implementation is designed to be used with
[Node.js](http://www.nodejs.org), it could be used in other contexts with minor
modifications.  This implementation does not have any external dependencies that
would preclude it from being used in the browser--just include it with a
`<script>` tag and it should be good to go.  _Disclaimer: I have not tested
this implementation in any other context/environment; only tested with node.js_


[travis-image]:https://travis-ci.org/jasonsjones/doubly-linked-list.svg
[travis-url]:https://travis-ci.org/jasonsjones/doubly-linked-list
[dm-image]:https://david-dm.org/jasonsjones/doubly-linked-list
[dm-url]:https://david-dm.org/jasonsjones/doubly-linked-list.svg