import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './style.css'
const columns = [
    {
      name: 'Code',
      selector: 'code',
    },
  {
    name: 'Model',
    selector: 'model',
  },
  {
    name: 'Model year',
    selector: 'modelyear',
  },
  {
    name: 'Manufacturer Name',
    selector: 'ManufacturerName',
  },
  {
    name: 'Make',
    selector: 'make',
  }
];
const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };


function Table() {

  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const countPerPage = 3;

  const getUserList = () => {
    axios.get(`http://localhost:2082/api/getvindetails?page=${page}&per_page=${countPerPage}&delay=1`,
    {
      headers: {
        'x-auth-token': localStorage.getItem("x-auth-token")
      }}).then(res => {
      setUsers(res.data.user);
    }).catch(err => {
      setUsers({});
    });
  }

  useEffect(() => {
    getUserList();
  }, [page]);

  return (
    <div className="App">
      <h3>VIN Response</h3>
      <DataTable
        columns={columns}
        data={users}
        customStyles={customStyles}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={users.total}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        onChangePage={page => setPage(page)}
      />
    </div>
  );
}

export default Table;