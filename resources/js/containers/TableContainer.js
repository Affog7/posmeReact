import { connect } from 'react-redux';
import Table from '../components/Table';

const TableContainer = ({ data }) => {
  return <Table data={data} />;
};

const mapStateToProps = (state) => ({
  data: state.data.data,
});

export default connect(mapStateToProps)(TableContainer);
