import React from 'react';
import { connect } from 'react-redux';
import { getData, setVin } from '../../store/actions/vinsSearch';
import SearchBar from '../../components/search-bar';
import ResultsTable from '../../components/results-table';
import LastVins from '../../components/last-vins';
import styles from './home.module.scss';

export const Home = ({ onSubmit, setVin, currentVin, loading, cache, serverError }) => {
  const renderSearchResults = () => {    
    if (serverError) {
      return <div className={styles.serverError}>{serverError}</div>
    } else if (currentVin) {
      return <>
        <h3 className={styles.currentVin}>Current VIN: {currentVin.name}</h3>
        <div className="note">{currentVin.message}</div>
        <ResultsTable list={currentVin && currentVin.results} />
      </>
    } else {
      return null
    }
  }

  return (
    <div>
      <h1 className={styles.title}>VIN Decoder</h1>
      <SearchBar onSubmit={onSubmit} isDisabled={loading} classes={[styles.searchBar]} />
      <LastVins vins={cache} onClick={setVin} />
      { renderSearchResults() }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    setVin: state.vinsSearch.setVin,
    currentVin: state.vinsSearch.currentVin,
    loading: state.vinsSearch.loading,
    cache: state.vinsSearch.cache,
    serverError: state.vinsSearch.serverError,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (e, value) => dispatch(getData(value)),
    setVin: (cacheElem) => dispatch(setVin(cacheElem)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);