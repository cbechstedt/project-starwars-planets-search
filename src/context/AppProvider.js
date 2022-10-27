import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [filterName, setFilterName] = useState('');

  const handleFilterName = ({ target }) => {
    setFilterName(target.value);
  };

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
    handleFilterName,
  }), [
    data,
    titles,
    filterName,
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
