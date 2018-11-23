import { ContexedAttributeObserver } from "../core/contexed_attriute_observer"
import { TopicObserver } from "./topic_observer"

export class PublicationObserver extends ContexedAttributeObserver {
    publications: Map<Element, Map<string, TopicObserver>> = new Map()

    syncPublications(element: Element, attributeName: string) {
        console.log("syncing")
        let publicationTopics = element.getAttribute(attributeName)
        if (publicationTopics === null) {
            publicationTopics = ""
        }

        console.log("topics to watch - " + publicationTopics)
        console.log("publications map - " + this.publications.get(element))

        if (this.publications.get(element) === undefined) {
            this.publications.set(element, new Map<string, TopicObserver>())
        }
        console.log("publications map - " + this.publications.get(element))

        const elementPulications = this.publications.get(element)
        const existingTopics = elementPulications!.keys()
        const newTopics = publicationTopics.split(" ").map(x => x.trim())
        const existingTopicsArray = new Array<string>()
        const deleteList = new Array<string>()
        const newList = new Array<string>()

        for (const topic of existingTopics) {
            if (newTopics.indexOf(topic) === -1) {
                deleteList.push(topic)
            } else {
                existingTopicsArray.push(topic)
            }
        }

        for (const topic of newTopics) {
            if (existingTopicsArray.indexOf(topic) === -1) {
                newList.push(topic)
            }
        }

        console.log("delete list -  " + deleteList)
        deleteList.forEach(topic => {
            const observer = elementPulications!.get(topic)
            if (observer !== undefined) {

                observer.stop()
                elementPulications!.delete(topic)
            }
        })

        console.log("new list -  " + newList)
        newList.forEach(topic => {
            const observer = new TopicObserver(element, topic, this.context)
            elementPulications!.set(topic, observer)
            observer.start()
        })
    }

    elementMatchedAttribute(element: Element, attributeName: string) {
        console.log("x")
        this.syncPublications(element, attributeName)
    }

    elementAttributeValueChanged(element: Element, attributeName: string) {
        console.log("x")
        this.syncPublications(element, attributeName)
    }

    elementUnmatchedAttribute(element: Element, attributeName: string) {
        this.syncPublications(element, attributeName)
    }

}
