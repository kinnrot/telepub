import { DOMTestCase } from "@stimulus/test"
import StubContext from "../stub_context"
import { PublicationObserver } from "../../src/observers/publication_observer"

export default class PublicationObserverTests extends DOMTestCase {

    attributeName = "data-pub"
    topic = "namespace-subject-id"
    fixtureHTML = `<div id="root">
        <div id="subId" data-sub='${this.topic}'></div>
        <div id="pubId" ${this.attributeName}='${this.topic}'></div>
    </div>`


    stubContext = new StubContext(this.fixtureElement)


    async "test publishTopicPrerendered"() {
        
        const observer = new PublicationObserver(this.stubContext, this.attributeName)
        const topicValue = "topic-val"
        this.rootElement.setAttribute(`data-${this.topic}`,topicValue)
        
        observer.start()

        await this.nextFrame
        
        this.assert.deepEqual(this.stubContext.calls, [["pulish", this.topic, topicValue]])
    }


    get rootElement() {
        return this.findElement("#pubId")
    }
}