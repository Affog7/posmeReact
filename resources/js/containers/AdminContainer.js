import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../actions/dataActions';
import TableContainer from '../containers/TableContainer';

const AdminContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Dynamic Table Example</h1>
      <TableContainer />
    </div>
  );
};

export default AdminContainer;
