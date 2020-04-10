import React, { useEffect, useState } from 'react';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getItemTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getItemList } from '../../http/itemApi';

const Items = () => {
  const itemRowKey = (items) => `${items.itemname}`;
  const handleEdit = () => {};
  const getSelectedRows = (selectedRows) => {
    console.log('In Customers', selectedRows);
  };
  const itemTableContent = () => {
    return mockItems.map((items) =>
      createItemData(
        items.id,
        items.barcode,
        items.itemname,
        items.category,
        items.costprice,
        items.sellingprice,
        items.quantity,
        items.storelocation,
        items.avatar
      )
    );
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
      avatar,
    };
  }
  return (
    <TableBuilder
      tableData={itemList}
      tableHeaders={getItemTableHeaders}
      title={'Items'}
      handleEdit={handleEdit}
    />
  );
};

export default Items;
