export interface Subscriber {
    subscribe(element: Element, topic: string): void
    unsubscribe(element: Element, topic: string): void
}
