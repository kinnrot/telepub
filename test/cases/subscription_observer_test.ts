import { DOMTestCase } from "@stimulus/test"
import { SubscriptionsObserver } from "../../src/observers/subscription_oserver"

export class SubscriptionObserverTests extends DOMTestCase {
    attributeName = "data-sub"
    topic = "namespace-subject-id"
    fixtureHTML = `<div id="outer" ${this.attributeName}='${this.topic}'>`
    context = {
        rootElement: this.fixtureElement,
        publish: (topic: string, val: string): void => {

        },
        subscribe: (element: Element, topic: string): void => {

        }
        
    }
    observer = new SubscriptionsObserver(this.context, this.attributeName)
}