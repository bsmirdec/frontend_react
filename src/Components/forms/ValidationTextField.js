import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const ValidationTextField = ({ id, label, validationFunc, helperText, ...props }) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setIsValid(validationFunc(inputValue));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div>
      <TextField
        id={id}
        name={id}
        label={label}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        fullWidth
        required
        margin="normal"
        error={!isValid && !isFocused} // Afficher une erreur seulement si le champ n'est pas valide et n'est pas en focus
        helperText={!isValid && !isFocused ? helperText : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isValid && isFocused && <CheckCircleIcon style={{ color: 'green' }} />}
              {!isValid && isFocused && <CancelIcon style={{ color: 'red' }} />}
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </div>
  );
};

export default ValidationTextField;
