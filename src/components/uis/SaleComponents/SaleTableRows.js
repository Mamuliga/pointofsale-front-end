import React from 'react';
import { connect } from 'react-redux';
import { setCartItems } from '../../../store/actions/saleActions';
import { TableRow, TableCell, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const SaleTableRows = ({
  setCartItems,
  cartItems,
  updateDisplayTotal,
  handleKeyDown,
  getItemTotal,
  row,
  rowIndex,
}) => {
  const handleFocus = event => event.target.select();
  const editableRowIndexes = ['quantity', 'discount'];
  if (row.id) {
    const deleteClick = () => {
      cartItems.splice(rowIndex, 1);
      setCartItems([...cartItems]);
    };
    return (
      <TableRow hover key={`${rowIndex}+${row.id}`}>
        {Object.keys(row).map(cell => {
          row.total = getItemTotal(row);
          if (editableRowIndexes.includes(cell)) {
            const handleTextInputChange = event => {
              const { value } = event.target;
              if (value >= 0) {
                row[cell] = value;
                setCartItems([...cartItems]);
                updateDisplayTotal();
              }
            };
            return (
              <TableCell key={cell}>
                <TextField
                  id={cell}
                  name={cell}
                  onFocus={handleFocus}
                  autoFocus={cell === 'quantity'}
                  value={row[cell]}
                  onChange={handleTextInputChange}
                  onKeyDown={handleKeyDown(cell)}
                />
              </TableCell>
            );
          }
          return <TableCell key={cell}>{row[cell]}</TableCell>;
        })}
        <TableCell key={'delete'} align='right'>
          <DeleteIcon onClick={deleteClick} />
        </TableCell>
      </TableRow>
    );
  }
  return null;
};

const mapStateToProps = ({ global, sale }) => {
  return { ...global, ...sale };
};

const mapActionToProps = {
  setCartItems,
};

export default connect(mapStateToProps, mapActionToProps)(SaleTableRows);
