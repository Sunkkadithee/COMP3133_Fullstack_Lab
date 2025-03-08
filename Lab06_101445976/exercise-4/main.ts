// main.ts
import { Customer } from './customer';

// Creating an instance of Customer with first name, last name, and age
let customer = new Customer("John", "Smith", 30);

// Calling the greeter method
customer.greeter();

// Calling the GetAge method to log the customer's age
customer.GetAge();
