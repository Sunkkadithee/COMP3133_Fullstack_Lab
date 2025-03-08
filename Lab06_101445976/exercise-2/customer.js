var Customer = /** @class */ (function () {
    function Customer() {
    }
    // Method to greet using the properties
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstName, " ").concat(this.lastName));
    };
    return Customer;
}());
// Creating an instance of Customer and setting properties
var customer = new Customer();
customer.firstName = "John";
customer.lastName = "Smith";
// Calling the greet method
customer.greeter(); // Expected output: Hello John Smith
