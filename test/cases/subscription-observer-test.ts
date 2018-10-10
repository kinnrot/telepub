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


    async "test subscribeToTopicPrerendered"() {
        const observer = new SubscriptionsObserver(this.context, this.attributeName)

        observer.start()

        await this.nextFrame

        this.assert.deepEqual(this.calls, [["subscribe", this.findElement("#subId"), this.topic]])
    }

    async "test subscribeTo2TopicsPrerendered"() {
        const topicToCheck = "other-topic"
        const anotherTopicToCheck = "another-topic"
        this.findElement("#subId").setAttribute(this.attributeName, `${topicToCheck} ${anotherTopicToCheck}`)
        const observer = new SubscriptionsObserver(this.context, this.attributeName)
        
        observer.start()

        await this.nextFrame

        this.assert.deepEqual(this.calls, [["subscribe", this.findElement("#subId"), topicToCheck], ["subscribe", this.findElement("#subId"), anotherTopicToCheck]])
    }

    async "test subscribeToTopicAddedViewJs"() {
        const observer = new SubscriptionsObserver(this.context, this.attributeName)
        const topicToCheck = "other-topic"
        this.rootElement.removeAttribute(this.attributeName)

        observer.start()

        await this.nextFrame

        this.findElement("#subId").setAttribute(this.attributeName, topicToCheck)

        await this.nextFrame

        console.log(this.calls)
        this.assert.deepEqual(this.calls, [["subscribe", this.findElement("#subId"), topicToCheck]])
    }

    async "test subscribeTo2TopicsAddedViewJs"() {
        const observer = new SubscriptionsObserver(this.context, this.attributeName)
        const topicToCheck = "other-topic"
        const anotherTopicToCheck = "another-topic"
        this.rootElement.removeAttribute(this.attributeName)

        observer.start()

        await this.nextFrame

        this.findElement("#subId").setAttribute(this.attributeName, `${topicToCheck} ${anotherTopicToCheck}`)

        await this.nextFrame

        console.log(this.calls)
        this.assert.deepEqual(this.calls, [["subscribe", this.findElement("#subId"), topicToCheck], ["subscribe", this.findElement("#subId"), anotherTopicToCheck]])
    }

    get rootElement() {
        return this.findElement("#subId")
    }
}