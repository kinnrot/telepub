import { Multimap } from "@stimulus/multimap"
import { Context } from "./core/context"
import { LiveData } from "./core/live_data"
import { SubscriptionsObserver } from "./observers/subscription_oserver"
import { PublicationObserver } from "./observers/publication_observer"

export class Telepub implements Context {

    rootElement: Element
    started = false

    publications: Multimap<string, LiveData>

    subscriptionObserver: SubscriptionsObserver
    publicationObserver: PublicationObserver

    constructor(rootElement: Element) {
        this.rootElement = rootElement

        this.subscriptionObserver = new SubscriptionsObserver(this, "data-sub")
        this.publicationObserver = new PublicationObserver(this, "data-pub")

        this.publications = new Multimap()
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
        //TODO
        //this.publications[topic]
    }

    subscribe(element: Element, topic: string) {
         //TODO
    }
}