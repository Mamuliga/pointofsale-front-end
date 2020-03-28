import React, { useEffect, useState } from 'react';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getItemTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getItemList } from '../../http/itemApi';

const Items = () => {
  const { location, push } = useHistory();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const handleGetItemResp = res => {
      if (Array.isArray(res.data)) {
        const displayItemList = res.data.map(item =>
          createItemData(
            item.id,
            item.barcode,
            item.itemname,
            item.category,
            item.costprice,
            item.sellingprice,
            item.quantity,
            item.storelocation,
            item.avatar
          )
        );
        setItemList(displayItemList);
      }
    };
    const handleGetItemErr = err => {};

    getItemList()
      .then(handleGetItemResp)
      .catch(handleGetItemErr);
  }, []);

  const handleRowClick = item => {
    const rowClick = () => {
      push(`${location.pathname}/edit/${item.id}`);
    };
    return rowClick;
  };

  function createItemData(
    id,
    barcode,
    itemname,
    category,
    costprice,
    sellingprice,
    quantity,
    storelocation,
    avatar
  ) {
    return {
      id,
      barcode,
      itemname,
      category,
      costprice,
      sellingprice,
      quantity,
      storelocation,
      avatar
    };
  }
  return (
    <TableBuilder
      tableData={itemList}
      tableHeaders={getItemTableHeaders}
      onRowClick={handleRowClick}
      title={'Items'}
    />
  );
};

export default Items;
