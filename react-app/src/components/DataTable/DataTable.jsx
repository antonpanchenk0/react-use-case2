import React from 'react';
import {useSelector} from 'react-redux';
import {selectors} from '../../redux/reducers/recordsReducer';
import './DataTable.css';

const DataTable = () => {
  const records = useSelector(selectors.recordsSelector);

  return (
    <div className="data-table-wrapper">
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Message</th>
        </tr>
        </thead>
        <tbody>
        {records.map((row) => (
          <tr key={row.email}>
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>{row.email}</td>
            <td>{row.message}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
