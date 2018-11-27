import { Context } from "../src/core/context"

export default class StubContext implements Context {
    rootElement: Element
    calls: any[][] = []

    constructor(rootElement: Element) {
        this.rootElement = rootElement
    }

    publish(topic: string, val: string): void {
        this.recordCall("publish", topic, val)
    }
    subscribe(element: Element, topic: string): void {
        this.recordCall("subscribe", element, topic)
    }
    unsubscribe(element: Element, topic: string): void {
        this.recordCall("usubscribe", element, topic)
    }

    private recordCall(methodName: string, ...args: any[]) {
        this.calls.push([methodName, ...args])
    }

    


}