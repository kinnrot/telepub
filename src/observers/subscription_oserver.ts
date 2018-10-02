import { BaseAttributeObserver } from "../core/base_attribbute_observer"

export class SubscriptionsObserver extends BaseAttributeObserver {
    elementMatchedAttribute(element: Element, attributeName: string) {
        const attrValue = element.getAttribute(attributeName)
        if (attrValue == null) {
            return
        }

        const topics: string[] = attrValue.split(" ")
        topics.forEach((topic) => {
            this.context.subscribe(element, topic)
        })
    }
}
