import { AttributeObserver, AttributeObserverDelegate } from "@stimulus/mutation-observers"

export abstract class BaseAttributeObserver implements AttributeObserverDelegate {
    protected element: Element
    protected attributeObserver: AttributeObserver

    constructor(element: Element, attributeName: string) {
        this.element = element
        this.attributeObserver = new AttributeObserver(this.element, attributeName, this)
    }

    start() {
        this.attributeObserver.start()
    }

    stop() {
        this.attributeObserver.stop()
    }


    abstract elementMatchedAttribute?(element: Element, attributeName: string): void
    abstract elementAttributeValueChanged?(element: Element, attributeName: string): void
    abstract elementUnmatchedAttribute?(element: Element, attributeName: string): void
}