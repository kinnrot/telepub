export interface Publisher {
    publish(topic: string, val: string): void
}
