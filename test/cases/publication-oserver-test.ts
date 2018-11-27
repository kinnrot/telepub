import {DOMTestCase} from "@stimulus/test"
import StubContext from "../stub_context"
import {PublicationObserver} from "../../src/observers/publication_observer"

export default class PublicationObserverTests extends DOMTestCase {

    attributeName = "data-pub"
    topic = "namespace-subject-id"
    fixtureHTML = `<div id="root">
        <div id="subId" data-sub='${this.topic}'></div>
        <div id="subId2" data-sub='${this.topic}2'></div>
        <div id="pubId" ${this.attributeName}='${this.topic}'>
            <div id="inPubId"></div>
        </div>
        <div id="pubId2"></div>
    </div>`

    stubContext = new StubContext(this.fixtureElement)

    async "test publishTopicPrerendered"() {

        const observer = new PublicationObserver(this.stubContext, this.attributeName)
        const topicValue = "topic-val"
        this.rootElement.setAttribute(`data-${this.topic}`, topicValue)

        observer.start()

        await this.nextFrame

        this.assert.deepEqual(this.stubContext.calls, [["publish", this.topic, topicValue]])
    }

    async "test publishTwoTopicsPrerendered"() {

        const observer = new PublicationObserver(this.stubContext, this.attributeName)
        const topicValue = "topic-val"
        this.rootElement.setAttribute(`data-${this.topic}`, topicValue)

        this.rootElement.setAttribute(`${this.attributeName}`, `${this.topic} ${this.topic}2`)
        this.rootElement.setAttribute(`data-${this.topic}2`, topicValue)

        observer.start()

        await this.nextFrame

        this.assert.deepEqual(this.stubContext.calls, [
            ["publish", this.topic, topicValue],
            ["publish", `${this.topic}2`, topicValue]

        ])
    }

    async "test publishTopicAddedView"() {
        const observer = new PublicationObserver(this.stubContext, this.attributeName)
        const topicValue = "topic-val"
        observer.start()

        this.rootElement.setAttribute(`data-${this.topic}`, topicValue)
        await this.nextFrame

        this.assert.deepEqual(this.stubContext.calls, [
            ["publish", this.topic, topicValue]
        ])
    }


    get rootElement() {
        return this.findElement("#pubId")
    }
}