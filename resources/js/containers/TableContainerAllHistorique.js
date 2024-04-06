// TableContainer.js
import { connect } from 'react-redux';
import TableComponentHistorique from '../components/TableComponentHistorique';
import { fetchAllHistorique, fetchDataAHSuccess, fetchDataHSuccess, fetchDayHistorique, fetchTodayHistorique } from '../actions/historiqueActions';
import TableComponentAllHistorique from '../components/TableComponentAllHistorique';

const mapStateToProps = (state) => ({
  data1: state.dataAH,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHData: () => dispatch(fetchAllHistorique()),  
  fetchDataSuccess: (data1) => dispatch(fetchDataAHSuccess(data1)),
  handleEdit: (item) => dispatch(fetchDayHistorique(item)),
});

const TableContainerAllHistorique = connect(mapStateToProps, mapDispatchToProps)(TableComponentAllHistorique);

export default TableContainerAllHistorique;
