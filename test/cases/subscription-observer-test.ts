import { DOMTestCase } from "@stimulus/test"
import { SubscriptionsObserver } from "../../src/observers/subscription_oserver"

export default class SubscriptionObserverTests extends DOMTestCase {
    attributeName = "data-sub"
    topic = "namespace-subject-id"
    fixtureHTML = `<div id="subId" ${this.attributeName}='${this.topic}'>`
    calls: any[][] = []

    recordCall(methodName: string, ...args: any[]) {
        this.calls.push([methodName, ...args])
    }

    context = {
        rootElement: this.fixtureElement,
        publish: (topic: string, val: string): void => {
            this.recordCall("pulish", topic, val)
        },
        subscribe: (element: Element, topic: string): void => {
            this.recordCall("subscribe", element, topic)
        }

    }


    async "test subscribeToTopic"() {
        const observer = new SubscriptionsObserver(this.context, this.attributeName)

        observer.start()

        await this.nextFrame

        console.log(this.calls)
        this.assert.deepEqual(this.calls, [["subscribe", this.findElement("#subId"), this.topic]])

        
    }
}