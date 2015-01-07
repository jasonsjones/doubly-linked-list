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
directions, as well as making operations that operate on the 'middel' of
the list a bit more efficient since each node has a reference the one
before it and the one after it.  The idea of having a links to the
previous and next nodes is where this data structure got its descriptive
name.

[travis-image]:https://travis-ci.org/jasonsjones/doubly-linked-list.svg
[travis-url]:https://travis-ci.org/jasonsjones/doubly-linked-list
[dm-image]:https://david-dm.org/jasonsjones/doubly-linked-list
[dm-url]:https://david-dm.org/jasonsjones/doubly-linked-list.svg