import React from "react";
import personService from "./Person";

const Persons = ({ filterPerson, setPersons, setMessage }) => {
  const isDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}`);
    if (result) {
      personService
        .deletePerson(person.id)
        .then((response) => {
          setPersons(filterPerson.filter((item) => item !== person));
          setMessage({
            text: `${person.name} has removed`,
            style: "hyva",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setMessage({
            text: `${person.name} was already removed from server`,
            style: "huono",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  return filterPerson.map((e) => (
    <p key={e.name}>
      {e.name} {e.number} <button onClick={() => isDelete(e)}>delete</button>
    </p>
  ));
};

export default Persons;
