import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Form() {
  const { filterName, handleFilterName } = useContext(AppContext);

  return (
    <form>
      <label htmlFor="filterName">
        Projeto Star Wars - Trybe
        <input
          data-testid="name-filter"
          id="filterName"
          type="text"
          value={ filterName }
          onChange={ handleFilterName }
        />
      </label>
    </form>
  );
}
