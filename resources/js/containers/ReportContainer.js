// TableContainer.js
import { connect } from 'react-redux';
import { fetchAllHistorique, fetchDataAHSuccess, fetchDataHSuccess, fetchDataReportSuccess, fetchDayHistorique, fetchReportData, fetchTodayHistorique } from '../actions/historiqueActions';
import ReportComponentDisplay from '../components/Reports';

const mapStateToProps = (state) => ({
  data: state.dataReports,
});

const ReportsContainer = connect(mapStateToProps)(ReportComponentDisplay);

export default ReportsContainer;
