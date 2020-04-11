import React, { useEffect, useState } from "react";
import TableBuilder from "../uis/TableBuilder.js";
import { useHistory } from "react-router-dom";
import { getItemTableHeaders } from "../../utilities/helpers/tableHelpers.js";
import { getItemList } from "../../http/itemApi";

const Items = () => {
  const { location, push } = useHistory();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const handleGetItemResp = res => {
      if (Array.isArray(res.data)) {
        const displayItemList = res.data.map(
          ({ id, barcode, itemName, category, reOrderLevel }) => {
            return { id, barcode, itemName, category, reOrderLevel };
          }
        );
        setItemList(displayItemList);
      }
    };
    const handleGetItemErr = () => {};

    getItemList()
      .then(handleGetItemResp)
      .catch(handleGetItemErr);
  }, []);

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
      title={"Items"}
      handleEdit={handleEdit}
    />
  );
};

export default Items;
