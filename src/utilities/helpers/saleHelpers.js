export const getItemTotal = row => {
  return parseFloat(row.qty * (row.salesPrice - row.discount)).toFixed(2);
};
