import React, { useState, useEffect } from "react";

import Filter from "./Filter";
import Persons from "./Persons";
import Notification from "./Notification";
import Person from "./Person";
import PersonForm from "./PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [filter, setFilter] = useState("");
  const [filterWords, setFilterWords] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    Person.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilterWords(
      persons.filter(
        (person) =>
          person.name.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
      )
    );
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (newName.length < 3 || newNumber.length < 8) {
      setMessage({
        text: `Name or number is too short. Name must be atleast 3 chars and number 8 chars.`,
        type: "huono",
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }
    const personArr = persons.map((e) => e.name);
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (personArr.includes(`${personObject.name}`)) {
      const oldPerson = persons.filter((e) => e.name === newName);
      const key_id = oldPerson.map((e) => e.id)[0];
      const question = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (question) {
        Person.update(key_id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );

            setMessage({
              text: `Edited ${returnedPerson.name}`,
              type: "hyva",
            });

            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })

          .catch((error) => {
            setMessage({
              text: error.response.data.error,
              type: "huono",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });

        setNewName("");
        setNewNumber("");
      }
    } else {
      Person.create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage({
            text: `Added ${returnedPerson.name}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            text: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });

      setNewName("");
      setNewNumber("");
    }
  };

  const nameChange = (e) => setNewName(e.target.value);
  const numberChange = (e) => setNewNumber(e.target.value);

  const addPersonData = {
    newName,
    newNumber,
    nameChange,
    numberChange,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} data={addPersonData} />
      <h2>Numbers</h2>
      {filter === "" ? (
        <Persons
          filterPerson={persons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      ) : (
        <Persons
          filterPerson={filterWords}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default App;
