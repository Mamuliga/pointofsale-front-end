export const getItemTotal = row => {
  return parseFloat(row.quantity * (row.receivePrice - row.discount)).toFixed(
    2
  );
};
