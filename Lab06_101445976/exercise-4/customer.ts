export class Customer {
    private firstName: string;
    private lastName: string;
    private _age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._age = age;
    }

    public greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }

    public GetAge(): void {
        console.log(`Age of ${this.firstName} ${this.lastName} is ${this._age}`);
    }
}

// Create an instance and call the methods
let customer = new Customer("John", "Smith", 30);
customer.greeter();
customer.GetAge();
