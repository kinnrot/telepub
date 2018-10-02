import { AttributeObserver, AttributeObserverDelegate } from "@stimulus/mutation-observers"
import { Context } from "./context"

export abstract class BaseAttributeObserver implements AttributeObserverDelegate {
    protected context: Context
    attributeObserver: AttributeObserver

    constructor(context: Context, attributeName: string) {
        this.context = context
        this.attributeObserver = new AttributeObserver(this.context.rootElement, attributeName, this)
    }

    start() {
        this.attributeObserver.start()
    }

    stop() {
        this.attributeObserver.stop()
    }


    abstract elementMatchedAttribute?(element: Element, attributeName: string): void
}