class PrintHelloWorld {
    greeting: string;

    constructor(greeting: string) {
        this.greeting = greeting;
    }

    hello() {
        console.log('Hello ' + this.greeting);
    }
}

export { PrintHelloWorld };