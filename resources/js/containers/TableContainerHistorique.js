// TableContainer.js
import { connect } from 'react-redux';
import TableComponentHistorique from '../components/TableComponentHistorique';
import { fetchDataHSuccess, fetchTodayHistorique } from '../actions/historiqueActions';

const mapStateToProps = (state) => ({
  data1: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHData: () => dispatch(fetchTodayHistorique()),  
  fetchDataHSuccess: (data1) => dispatch(fetchDataHSuccess(data1)),
});

const TableContainerHistorique = connect(mapStateToProps, mapDispatchToProps)(TableComponentHistorique);

export default TableContainerHistorique;