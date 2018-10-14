import { DOMTestCase } from "@stimulus/test"
import { PublicationObserver } from "../../src/observers/publication_observer"

export default class PublicationObserverTests extends DOMTestCase {
    attributeName = "data-pub"
    topic = "namespace-subject-id"
    fixtureHTML = `<div id="root">
    <div id="subId" data-sub='${this.topic}'></div>
    <div id="pubId" ${this.attributeName}='${this.topic}></div>
    </div>`
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


    async "test subscribeToTopicPrerendered"() {
        const observer = new SubscriptionsObserver(this.context, this.attributeName)

        observer.start()

        await this.nextFrame

        this.assert.deepEqual(this.calls, [["subscribe", this.findElement("#subId"), this.topic]])
    }


    get rootElement() {
        return this.findElement("#subId")
    }
}