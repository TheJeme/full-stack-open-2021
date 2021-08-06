import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = () => {
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    onSubmit,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data);
    });
  }, [setResources, baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
  };

  const service = {
    create,
  };

  return [resources, service];
};
