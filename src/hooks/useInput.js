import { useState } from 'react';

function useInput(defaultValue = '', maxLength = undefined) {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({ target }) {
    if (maxLength === undefined || target.value.length <= maxLength) {
      setValue(target.value);
    }
  }

  return [value, handleValueChange, setValue];
}

export default useInput;