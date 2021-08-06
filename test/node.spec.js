var chai = require("chai");
var LinkedList = require("../");

var expect = chai.expect;

describe("List Node", function () {
    var list = null;

    before(function () {
        list = new LinkedList();
    });

    it("exists when instantiated", function () {
        var node = list.createNewNode("test data");
        expect(node).to.exist;
    });

    it("returns the correct (primitive) data", function () {
        var node = list.createNewNode("test data");
        var data = node.getData();
        expect(data).to.be.a("string");
        expect(data).to.eq("test data");

        node.data = 42;
        data = node.getData();
        expect(data).to.be.a("number");
        expect(data).to.equal(42);
    });

    [0, "", [], {}].forEach(function (val) {
        it("returns the correct falsy data for " + val, function () {
            var node = list.createNewNode(val);
            expect(node.getData()).to.equal(val);
        });
    });

    it("returns the correct (object) data", function () {
        var node = list.createNewNode({
            name: "test item",
            number: 1
        });
        var data = node.getData();
        expect(data).to.be.an("object");
        expect(node.toString()).to.eq('{"name":"test item","number":1}');
    });

    it("returns whether or not it has a next node", function () {
        var firstNode = list.createNewNode("first node");
        var secondNode = list.createNewNode("second node");
        firstNode.next = secondNode;
        expect(firstNode.hasNext()).to.be.true;
    });

    it("returns whether or not it has a previous node", function () {
        var firstNode = list.createNewNode("first node");
        var secondNode = list.createNewNode("second node");
        secondNode.prev = firstNode;
        expect(secondNode.hasPrev()).to.be.true;
    });

    it("returns a proper string representation of its data", function () {
        var node = list.createNewNode({ name: "test item", number: 1 });
        expect(node.toString()).to.eq('{"name":"test item","number":1}');

        node.data = "string data";
        expect(node.toString()).to.eq("string data");

        node.data = 42;
        expect(node.toString()).to.eq("42");
    });
});
