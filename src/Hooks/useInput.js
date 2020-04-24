import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };

  return { value, onChange };
};
