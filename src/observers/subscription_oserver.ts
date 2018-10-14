import { ContexedAttributeObserver } from "../core/contexed_attriute_observer";

export class SubscriptionsObserver extends ContexedAttributeObserver {
    subscriptions: Map<Element, string[]> = new Map()

    syncPublications(element: Element, attributeName: string) {
        let topics = element.getAttribute(attributeName)
        if (topics === null) {
            topics = ""
        }

        if (this.subscriptions.get(element) === undefined) {
            this.subscriptions.set(element, new Array<string>())
        }

        const existingTopics = this.subscriptions.get(element)
        const newTopics = topics.split(" ").map(x => x.trim())
        const existingTopicsArray = new Array<string>()
        const deleteList = new Array<string>()
        const newList = new Array<string>()

        for (const topic in existingTopics!) {
            if (newTopics.indexOf(topic) === -1) {
                deleteList.push(topic)
            } else {
                existingTopicsArray.push(topic)
            }
        }

        for (const topic in newTopics) {
            if (existingTopicsArray.indexOf(topic) === -1) {
                newList.push(topic)
            }
        }

        deleteList.forEach(topic => {
            this.context.unsubscribe(element, topic)
        })

        newList.forEach(topic => {
            this.context.subscribe(element, topic)
        })
    }


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

    elementAttributeValueChanged?(element: Element, attributeName: string): void

    elementUnmatchedAttribute?(element: Element, attributeName: string): void
}
