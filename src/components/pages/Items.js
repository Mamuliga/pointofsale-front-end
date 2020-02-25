import React from 'react';
import mockItems from '../../utilities/mockData/items.json';
import TableBuilder from '../uis/TableBuilder.js';
import { getItemTableHeaders } from '../../utilities/helpers/tableHelpers.js';

const Items = () => {
  const itemRowKey = items => `${items.itemname}`;
  const getSelectedRows = selectedRows => {
    console.log('In Customers', selectedRows);
  };
  const itemTableContent = () => {
    return mockItems.map(items =>
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
    return [
      id,
      barcode,
      itemname,
      category,
      costprice,
      sellingprice,
      quantity,
      storelocation,
      avatar
    ];
  }
  return (
    <TableBuilder
      rowKey={itemRowKey}
      getSelectedRows={getSelectedRows}
      tableData={itemTableContent()}
      tableHeaders={getItemTableHeaders}
      title={'Items'}
    />
  );
};

export default Items;
