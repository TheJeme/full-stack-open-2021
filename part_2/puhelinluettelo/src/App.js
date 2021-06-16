import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWord, setFilterWord] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  let filteredPersons = persons.filter((nimi) =>
    nimi.name.includes(filterWord)
  );

  const handleWordChange = (event) => {
    setFilterWord(event.target.value);
    filteredPersons = persons.filter((nimi) => nimi.name.includes(filterWord));
  };

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].name === obj.name) {
        return true;
      }
    }
    return false;
  }

  const handleClick = (event) => {
    event.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber,
    };
    if (!containsObject(nameObj, persons)) {
      setPersons(persons.concat(nameObj));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <Phonebook
        filterWord={filterWord}
        handleWordChange={(e) => handleWordChange(e)}
      />
      <Addnew
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(e) => handleNameChange(e)}
        handleNumChange={(e) => handleNumChange(e)}
        handleClick={(e) => handleClick(e)}
      />
      <Numbers filteredPersons={filteredPersons} />
    </div>
  );
};

const Phonebook = (props) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input
          value={props.filterWord}
          onChange={(e) => props.handleWordChange(e)}
        />
      </div>
    </div>
  );
};

const Addnew = (props) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input onChange={(e) => props.handleNameChange(e)} />
        </div>
        <div>
          number:
          <input
            value={props.newNumber}
            onChange={(e) => props.handleNumChange(e)}
          />
        </div>
        <div>
          <button onClick={(e) => props.handleClick(e)} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

const Numbers = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      {props.filteredPersons.map((p) => (
        <p key={p.name}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  );
};

export default App;
