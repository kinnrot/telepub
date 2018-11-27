import {AttributeObserver, AttributeObserverDelegate} from "@stimulus/mutation-observers"
import {ConsoleLogService} from "./console_log_service"


export abstract class BaseAttributeObserver implements AttributeObserverDelegate {
    protected element: Element
    protected attributeObserver: AttributeObserver
    protected logger = new ConsoleLogService()

    constructor(element: Element, attributeName: string) {
        this.element = element
        this.attributeObserver = new AttributeObserver(this.element, attributeName, this)
    }

    start() {
        console.log("start observing - " + this.attributeObserver.attributeName + " on el id" + this.element.id)
        this.attributeObserver.start()
    }

    stop() {
        console.log("stop observing - " + this.attributeObserver.attributeName + " on el id" + this.element.id)
        this.attributeObserver.stop()
    }

    log(...args: any[]) {
        this.logger.log(args)
    }


    abstract elementMatchedAttribute?(element: Element, attributeName: string): void

    abstract elementAttributeValueChanged?(element: Element, attributeName: string): void

    abstract elementUnmatchedAttribute?(element: Element, attributeName: string): void
}