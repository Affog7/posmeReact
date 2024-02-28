import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Name</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.id}</td>
            <td className="border px-4 py-2">{item.name}</td>
            {/* Render additional columns based on your data */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
