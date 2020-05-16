import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getItemTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getItemList } from '../../http/itemApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';

const Items = ({ fetchApi, setFetchApiInfo }) => {
  const { location, push } = useHistory();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const handleGetItemResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displayItemList = res.data.map(
          ({ id, barcode, itemName, category, reOrderLevel }) => {
            return { id, barcode, itemName, category, reOrderLevel };
          }
        );
        setItemList(displayItemList);
      }
    };
    const handleGetItemErr = () => {
      setFetchApiInfo({ type: 'error', message: 'Unable to get Items' });
      fetchApi(false);
    };

    fetchApi(true);
    getItemList().then(handleGetItemResp).catch(handleGetItemErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleEdit = item => {
    const editClick = () => {
      push(`${location.pathname}/edit/${item.id}`);
    };
    return editClick;
  };
  return (
    <TableBuilder
      tableData={itemList}
      tableHeaders={getItemTableHeaders}
      title={'Items'}
      handleEdit={handleEdit}
    />
  );
};
const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Items);
