import PropTypes from 'prop-types';
import { useEffect, useMemo, useState, useCallback } from 'react';
import AppContext from './AppContext';

const columnOptions = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [columnUpdated, setColumnUpdated] = useState(columnOptions);
  const [column, setColumn] = useState(columnUpdated[0]);
  const [comparison, setComparison] = useState('maior que');
  const [valueNumber, setValueNumber] = useState(0);

  const handleFilterName = ({ target }) => {
    setFilterName(target.value);
  };

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleValueNumber = ({ target }) => {
    setValueNumber(target.value);
  };

  const handleFilterBtn = useCallback(() => {
    if (comparison === 'maior que') {
      const filtedData = data.filter((element) => (
        Number(element[column]) > Number(valueNumber)));
      setData(filtedData);
    }
    if (comparison === 'menor que') {
      const filtedData = data.filter((element) => (
        Number(element[column]) < Number(valueNumber)));
      setData(filtedData);
    }
    if (comparison === 'igual a') {
      const filtedData = data.filter((element) => (
        Number(element[column]) === Number(valueNumber)));
      setData(filtedData);
    }
    const updatedColumn = columnUpdated
      .filter((element) => element !== column);
    setColumnUpdated(updatedColumn);
    setColumn(updatedColumn[0]);
  }, [column, comparison, data, valueNumber, columnUpdated]);

  const requestAPI = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    results.forEach((element) => {
      delete element.residents;
    });
    setData(results);
    const tableTitles = Object.keys(results[0]);
    setTitles(tableTitles);
  };

  useEffect(() => { requestAPI(); }, []);

  const contextValue = useMemo(() => ({
    data,
    titles,
    filterName,
    column,
    comparison,
    valueNumber,
    handleFilterName,
    handleColumn,
    handleComparison,
    handleValueNumber,
    handleFilterBtn,
    columnUpdated,
  }), [
    data,
    titles,
    filterName,
    column,
    comparison,
    valueNumber,
    handleFilterBtn,
    columnUpdated,
  ]);

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
