import { Publisher } from "./publisher"
import { Subscriber } from "./subscriber"

export interface Context extends Publisher, Subscriber {
    rootElement: Element
}