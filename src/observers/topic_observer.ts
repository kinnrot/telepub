import { BaseAttributeObserver } from "../core/base_attribbute_observer"
import { Publisher } from "../core/publisher"

export class TopicObserver extends BaseAttributeObserver {
    private topic: string
    private publisher: Publisher

    constructor(element: Element, topic: string, publisher: Publisher) {
        super(element, `data-${topic}`)
        this.topic = topic
        this.publisher = publisher
    }

    elementMatchedAttribute(element: Element, attributeName: string) {

    }

    elementAttributeValueChanged(element: Element, attributeName: string) {
        const val = element.getAttribute(attributeName)
        if (this.element === element && val != null) {
            this.publisher.publish(this.topic, val)
        }
    }

    elementUnmatchedAttribute(element: Element, attributeName: string) {
    
    }
}
