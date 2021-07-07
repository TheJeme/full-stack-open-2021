import React from "react";

const PersonForm = ({ addPerson, data }) => {
  return (
    <form onSubmit={addPerson}>
      <p>
        name: <input value={data.newName} onChange={data.nameChange} />
      </p>
      <p>
        number: <input value={data.newNumber} onChange={data.numberChange} />
      </p>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
