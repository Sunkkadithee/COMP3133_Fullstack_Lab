class Customer {
    firstName: string;
    lastName: string;

    // Method to greet using the properties
    public greeter() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}

// Creating an instance of Customer and setting properties
let customer = new Customer();
customer.firstName = "John";
customer.lastName = "Smith";

// Calling the greet method
customer.greeter();  // Expected output: Hello John Smith
