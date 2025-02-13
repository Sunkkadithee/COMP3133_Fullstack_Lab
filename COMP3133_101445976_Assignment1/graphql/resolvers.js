const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid Credentials");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { token, user };
    },

    getAllEmployees: async () => await Employee.find(),

    searchEmployeeById: async (_, { id }) => await Employee.findById(id),

    searchEmployeeByDesignationOrDept: async (_, { designation, department }) => {
      const filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;
      return await Employee.find(filter);
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      return await user.save();
    },

    addEmployee: async (_, args) => {
      const employee = new Employee(args);
      return await employee.save();
    },

    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted";
    },
  },
};

module.exports = resolvers;
