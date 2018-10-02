export class LiveData {
    constructor(private value?: string) {
        this.observers = new Array<Element>()
    }

    observers: Element[]

    async postValue(newValue: string) {
        await setTimeout(() => this.setValue(newValue), 0)
    }

    setValue(newValue?: string) {
        if (this.value !== newValue) {
            const oldValue = this.value
            this.value = newValue
            this.notifySubscribers(oldValue, newValue)
        }
    }

    observe(element: Element) {
        this.observers.push(element)
    }

    notifySubscribers(oldValue?: string, newValue?: string) {

    }
}
