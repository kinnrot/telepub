// Declare the console as an ambient value so that TypeScript doesn't complain.
import {Logger} from "./logger"

declare let console: any


// I log values to the ambient console object.
export class ConsoleLogService implements Logger {

    assert(...args: any[]): void {

        ( console && console.assert ) && console.assert(...args)

    }


    error(...args: any[]): void {

        ( console && console.error ) && console.error(...args)

    }


    group(...args: any[]): void {

        ( console && console.group ) && console.group(...args)

    }


    groupEnd(...args: any[]): void {

        ( console && console.groupEnd ) && console.groupEnd(...args)

    }


    info(...args: any[]): void {

        ( console && console.info ) && console.info(...args)

    }


    log(...args: any[]): void {

        ( console && console.log ) && console.log(...args)

    }


    warn(...args: any[]): void {

        ( console && console.warn ) && console.warn(...args)

    }

}