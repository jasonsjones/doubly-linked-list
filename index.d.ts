declare module "dbly-linked-list" {
  type NodeData = object | number | string

  export class Node {
    public data: NodeData
    public next: Node | null
    public prev: Node | null

    constructor(data: NodeData)

    public hasNext(): boolean

    public hasPrev(): boolean

    public getData<Data>(): Data

    public toString(): string
  }

  class Iterator {
    next(): Node
    reset(): void
    each(fn: Function): void
    stopIterationFlag: boolean
    hasNext(): boolean
    interrupt(): void
  }

  export default class LinkedList {
    public iterator: Iterator
    public head?: Node
    public tail?: Node
    public size: number

    constructor()

    public createNewNode(data: NodeData): Node

    public getHeadNode(): Node | null

    public getTailNode(): Node | null

    public isEmpty(): boolean

    public getSize(): number

    public clear(): void

    public insert(data: NodeData): true

    public insertFirst(data: NodeData): true

    public insertAt(index: number, data: NodeData): boolean

    public insertBefore(nodeData: NodeData, data: NodeData): boolean

    public insertAfter(nodeData: NodeData, data: NodeData): boolean

    public concat(otherLinkedList: LinkedList): LinkedList

    public remove(): Node | null

    public removeFirst(): Node | null

    public removeAt(index: number): Node | null

    public removeNode(nodeData: NodeData): Node | null

    public indexOf(nodeData: NodeData): number

    public find(nodeData: NodeData): number

    public findAt(index: number): Node

    public contains(nodeData: NodeData): boolean

    public forEach(fn: Function, reverse?: boolean): void

    public toArray(): NodeData[]

    public interruptEnumeration(): void
  }
}
