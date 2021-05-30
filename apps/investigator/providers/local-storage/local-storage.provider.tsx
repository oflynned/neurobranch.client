import React, { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const deleteValue = () => localStorage.removeItem(key);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    setValue(initial);
  }, [key, defaultValue]);

  useEffect(() => {
    if (value && value.length > 0) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue, deleteValue] as const;
};
