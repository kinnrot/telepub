import { BaseAttributeObserver } from "./base_attribbute_observer"
import { Context } from "./context"

export abstract class ContexedAttributeObserver extends BaseAttributeObserver {
    protected context: Context
    
    constructor(context: Context, attributeName: string) {
        super(context.rootElement, attributeName)
        this.context = context        
    }    
}
