// Define the interface that all loggers must implement.
export interface Logger {
    assert(...args: any[]): void

    error(...args: any[]): void

    group(...args: any[]): void

    groupEnd(...args: any[]): void

    info(...args: any[]): void

    log(...args: any[]): void

    warn(...args: any[]): void
}


