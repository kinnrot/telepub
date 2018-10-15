export class LiveData {
    constructor(private value: string, private attributeName: string) {
        this.observers = new Array<Element>()
        this.oldValue = ""
    }

    oldValue: string
    observers: Element[]

    postValue(newValue: string) {
        this.setValue(newValue)
    }
    
    observe(element: Element) {
        this.observers.push(element)

        // when we observe data, we should get the data initial value immidietly
        this.updateSubscriber(element)
    }

    removeObserver(element: Element) {
        const index = this.observers.indexOf(element)
        if (index > -1) {
            this.observers.splice(index, 1)
        }
    }

    private setValue(newValue: string) {
        if (this.value !== newValue) {
            this.oldValue = this.value
            this.value = newValue
            this.notifySubscribers()
        }
    }


    private async notifySubscribers() {
        // make sure we only post last value for each event loop iteration
        await setTimeout(() => {
            this.observers.forEach(element => {
                this.updateSubscriber(element)
            })
        }, 0)
    }

    private async updateSubscriber(element: Element) {
        if (element.getAttribute(this.attributeName) !== this.value) {
            element.setAttribute(this.attributeName, this.value)
            
            const event = new CustomEvent(`${this.attributeName}-changed`, { detail: { oldValue: this.oldValue, newValue: this.value } })
            element.dispatchEvent(event)
        }
    }
}
