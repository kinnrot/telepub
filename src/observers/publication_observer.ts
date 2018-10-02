import { BaseAttributeObserver } from "../core/base_attribbute_observer";

export class PublicationObserver extends BaseAttributeObserver {
    elementMatchedAttribute(element: Element, attributeName: string) {
        const publisherVal = element.getAttribute(attributeName)
        if (publisherVal != null) {
            const [value, topic] = publisherVal.split(":").map(x => x.trim())
            if (value !== "") {
                this.context.publish(topic, value)
            }
        }
    }
}
