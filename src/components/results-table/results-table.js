import React from 'react';
import PropTypes from 'prop-types';

const ResultsTable = ({ list }) => {

  const renderTable = () => (
    <table className="table-striped">
      <tbody>
      { list.filter(el => el.Variable !== 'Error Code')
            .map(el => (
              <tr key={el.VariableId}>
                <td>{el.Variable}</td>
                <td>{el.Value}</td>
              </tr>
            )) }
      </tbody>
    </table>
  )

  return (
    <>
      { list && (list.length !== 0) && renderTable() } 
    </>
  )
}

ResultsTable.propTypes = {
  list: PropTypes.array,
}

ResultsTable.defaultProps = {
  list: [],
}

export default ResultsTable;
