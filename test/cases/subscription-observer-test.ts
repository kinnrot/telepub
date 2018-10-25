import { DOMTestCase } from "@stimulus/test"
import { SubscriptionsObserver } from "../../src/observers/subscription_oserver"
import StubContext from "../stub_context";

export default class SubscriptionObserverTests extends DOMTestCase {
    attributeName = "data-sub"
    topic = "namespace-subject-id"
    fixtureHTML = `<div id="subId" ${this.attributeName}='${this.topic}'>`
    

    

    stubContext = new StubContext(this.fixtureElement)


    async "test subscribeToTopicPrerendered"() {
        const observer = new SubscriptionsObserver(this.stubContext, this.attributeName)

        observer.start()

        await this.nextFrame

        this.assert.deepEqual(this.stubContext.calls, [["subscribe", this.findElement("#subId"), this.topic]])
    }

    async "test subscribeTo2TopicsPrerendered"() {
        const topicToCheck = "other-topic"
        const anotherTopicToCheck = "another-topic"
        this.findElement("#subId").setAttribute(this.attributeName, `${topicToCheck} ${anotherTopicToCheck}`)
        const observer = new SubscriptionsObserver(this.stubContext, this.attributeName)
        
        observer.start()

        await this.nextFrame

        this.assert.deepEqual(this.stubContext.calls, [["subscribe", this.findElement("#subId"), topicToCheck], ["subscribe", this.findElement("#subId"), anotherTopicToCheck]])
    }

    async "test subscribeToTopicAddedViewJs"() {
        const observer = new SubscriptionsObserver(this.stubContext, this.attributeName)
        const topicToCheck = "other-topic"
        this.rootElement.removeAttribute(this.attributeName)

        observer.start()

        await this.nextFrame

        this.findElement("#subId").setAttribute(this.attributeName, topicToCheck)

        await this.nextFrame

        
        this.assert.deepEqual(this.stubContext.calls, [["subscribe", this.findElement("#subId"), topicToCheck]])
    }

    async "test subscribeTo2TopicsAddedViewJs"() {
        const observer = new SubscriptionsObserver(this.stubContext, this.attributeName)
        const topicToCheck = "other-topic"
        const anotherTopicToCheck = "another-topic"
        this.rootElement.removeAttribute(this.attributeName)

        observer.start()

        await this.nextFrame

        this.findElement("#subId").setAttribute(this.attributeName, `${topicToCheck} ${anotherTopicToCheck}`)

        await this.nextFrame

        this.assert.deepEqual(this.stubContext.calls, [["subscribe", this.findElement("#subId"), topicToCheck], ["subscribe", this.findElement("#subId"), anotherTopicToCheck]])
    }

    get rootElement() {
        return this.findElement("#subId")
    }
}