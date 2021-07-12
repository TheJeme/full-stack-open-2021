const mongoose = require("mongoose");

const makeConnection = (password) => {
  const url = `mongodb+srv://fullstack:${password}@full-stack-open-2021.ztgue.mongodb.net/persons-app?retryWrites=true&w=majority`;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

const getAllPersons = () => {
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("persons", personSchema);

  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
};

const addPerson = (name, number) => {
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("persons", personSchema);

  const person = new Person({
    name: `${name}`,
    number: `${number}`,
  });

  person.save().then((response) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

if (process.argv.length < 3) {
  console.log("give password as argument");
} else if (process.argv.length == 3) {
  const password = process.argv[2];
  makeConnection(password);
  console.log("phonebook:");
  getAllPersons();
} else if (process.argv.length == 5) {
  const password = process.argv[2];
  makeConnection(password);
  const name = process.argv[3];
  const number = process.argv[4];
  addPerson(name, number);
}
