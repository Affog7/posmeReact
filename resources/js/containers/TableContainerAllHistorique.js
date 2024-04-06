// TableContainer.js
import { connect } from 'react-redux';
import { fetchAllHistorique, fetchDataAHSuccess, fetchDataHSuccess, fetchDayHistorique, fetchReportData, fetchTodayHistorique } from '../actions/historiqueActions';
import TableComponentAllHistorique from '../components/TableComponentAllHistorique';

const mapStateToProps = (state) => ({
  data1: state.dataAH,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHData: () => dispatch(fetchAllHistorique()),  
  fetchDataSuccess: (data1) => dispatch(fetchDataAHSuccess(data1)),
  handleEdit: (item) => dispatch(fetchDayHistorique(item)),
  handleReport: (item) => dispatch(fetchReportData(item)),
});

const TableContainerAllHistorique = connect(mapStateToProps, mapDispatchToProps)(TableComponentAllHistorique);

export default TableContainerAllHistorique;
