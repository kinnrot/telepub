export class LiveData {
    constructor(private value: string, private attributeName: string) {
        this.observers = new Array<Element>()
    }

    observers: Element[]

    postValue(newValue: string) {
        this.setValue(newValue)
    }

    setValue(newValue: string) {
        if (this.value !== newValue) {
            const oldValue = this.value
            this.value = newValue
            this.notifySubscribers()
        }
    }

    observe(element: Element) {
        this.observers.push(element)
    }

    removeObserver(element: Element) {
        const index = this.observers.indexOf(element)
        if (index > -1) {
            this.observers.splice(index, 1)
        }
    }

    async notifySubscribers() {
        // make sure we only post last value for each event loop iteration
        await setTimeout(() => {
            this.observers.forEach(element => {
                element.setAttribute(this.attributeName, this.value)
            })
        }, 0)
    }
}
