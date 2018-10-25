import { DOMTestCase } from "@stimulus/test"
import StubContext from "../stub_context"


export default class PublicationObserverTests extends DOMTestCase {
    attributeName = "data-pub"
    topic = "namespace-subject-id"
    fixtureHTML = `<div id="root">
    <div id="subId" data-sub='${this.topic}'></div>
    <div id="pubId" ${this.attributeName}='${this.topic}></div>
    </div>`
    

    stubContext = new StubContext(this.fixtureElement)


    async "test subscribeToTopicPrerendered"() {
        this.assert.deepEqual(this.stubContext.calls,[])        
    }


    get rootElement() {
        return this.findElement("#subId")
    }
}