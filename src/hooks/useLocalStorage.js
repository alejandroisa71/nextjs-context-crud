import { useDebugValue, useEffect, useState } from 'react';

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(initialState);
  useDebugValue(state)

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parse(item));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [state, setState];
}

function parse(obj) {
  try {
    return JSON.parse(obj);
  } catch {
    return obj;
  }
}