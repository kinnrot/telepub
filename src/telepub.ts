import { Context } from "./core/context"
import { LiveData } from "./core/live_data"
import { SubscriptionsObserver } from "./observers/subscription_oserver"
import { PublicationObserver } from "./observers/publication_observer"

export class Telepub implements Context {

    rootElement: Element
    started = false

    publications: Map<string, LiveData>

    subscriptionObserver: SubscriptionsObserver
    publicationObserver: PublicationObserver

    constructor(rootElement: Element) {
        this.rootElement = rootElement

        this.subscriptionObserver = new SubscriptionsObserver(this, "data-sub")
        this.publicationObserver = new PublicationObserver(this, "data-pub")

        this.publications = new Map()
    }

    start() {
        if (!this.started) {
            this.started = true
            this.subscriptionObserver.start()
            this.publicationObserver.start()
        }
    }

    stop() {
        if (this.started) {
            this.started = false
            this.subscriptionObserver.stop()
            this.publicationObserver.stop()
        }
    }

    publish(topic: string, val: string) {
        const liveData = this.ensureTopicPresent(topic)
        return liveData.postValue(val)
    }

    subscribe(element: Element, topic: string) {
        const liveData = this.ensureTopicPresent(topic)
        liveData.observe(element)
    }

    unsubscribe(element: Element, topic: string) {
        const liveData = this.ensureTopicPresent(topic)
        liveData.removeObserver(element)
    }

    ensureTopicPresent(topic:string):LiveData{
        if (!this.publications.has(topic)){
            this.publications.set(topic, new LiveData("",`data-${topic}`))
        }

        return this.publications.get(topic)!
    }
}