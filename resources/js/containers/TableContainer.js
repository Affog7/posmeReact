// TableContainer.js
import { connect } from 'react-redux';
import TableComponent from '../components/TableComponent';
import { fetchDataSuccess, fetchData } from '../actions/dataActions';

const mapStateToProps = (state) => ({
  data: state.data,
});
 const mapDispatchToProps = (dispatch, props) => ({
  fetchData: () => dispatch(fetchData()), // Appelle fetchData en tant que fonction
  fetchDataSuccess: (data) => dispatch(fetchDataSuccess(data)),
  addMultipleToCart: props.addMultipleToCart ,
});

const TableContainer = connect(mapStateToProps, mapDispatchToProps)(TableComponent);

export default TableContainer;
