import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Form() {
  const { filterName, handleFilterName, column, handleColumn,
    comparison, handleComparison, valueNumber,
    handleValueNumber, handleFilterBtn, columnUpdated } = useContext(AppContext);

  return (
    <form>
      <label htmlFor="filterName">
        Planeta
        <input
          type="text"
          data-testid="name-filter"
          id="filterName"
          value={ filterName }
          onChange={ handleFilterName }
        />
      </label>

      <label htmlFor="column">
        Coluna
        <select
          data-testid="column-filter"
          id="column"
          name="column"
          value={ column }
          onChange={ handleColumn }
        >
          { columnUpdated.map((element) => (
            <option key={ element } value={ element }>{ element }</option>
          )) }
        </select>
      </label>

      <label htmlFor="comparison">
        Operador
        <select
          data-testid="comparison-filter"
          id="comparison"
          name="comparison"
          value={ comparison }
          onChange={ handleComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        type="number"
        data-testid="value-filter"
        id="valueNumber"
        value={ valueNumber }
        onChange={ handleValueNumber }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterBtn }
      >
        Filtrar
      </button>

    </form>
  );
}
