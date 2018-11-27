import { ContexedAttributeObserver } from "../core/contexed_attriute_observer"
import { TopicObserver } from "./topic_observer"


export class PublicationObserver extends ContexedAttributeObserver {
    publications: Map<Element, Map<string, TopicObserver>> = new Map()


    syncPublications(element: Element, attributeName: string) {
        const publicationTopics = this.topics(element, attributeName)

        this.log("topics to watch - " + publicationTopics)

        this.ensurePublicationsPresent(element)

        const elementPublications = this.publications.get(element)
        const existingTopics = elementPublications!.keys()
        const newTopics = publicationTopics.split(" ").map(x => x.trim())
        const existingTopicsArray = []
        const deleteList = []
        const newList = []

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

        this.log("delete list -  " + deleteList)
        deleteList.forEach(topic => {
            const observer = elementPublications!.get(topic)
            if (observer !== undefined) {

                observer.stop()
                elementPublications!.delete(topic)
            }
        })

        this.log("new list -  " + newList)
        newList.forEach(topic => {
            const observer = new TopicObserver(element, topic, this.context)
            elementPublications!.set(topic, observer)
            observer.start()
        })
    }

    private ensurePublicationsPresent(element: Element) {
        if (this.publications.get(element) === undefined) {
            this.publications.set(element, new Map<string, TopicObserver>())
        }
    }

    private topics(element: Element, attributeName: string) {
        let publicationTopics = element.getAttribute(attributeName)
        if (publicationTopics === null) {
            publicationTopics = ""
        }
        return publicationTopics
    }

    elementMatchedAttribute(element: Element, attributeName: string) {
        this.syncPublications(element, attributeName)
    }

    elementAttributeValueChanged(element: Element, attributeName: string) {
        this.syncPublications(element, attributeName)
    }

    elementUnmatchedAttribute(element: Element, attributeName: string) {
        this.syncPublications(element, attributeName)
    }

}
