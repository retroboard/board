import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ipfsService from '../services/ipfsService';
import Column from '../components/Column';
import { InputModal } from '../components/InputModal';
import Button from '@material-ui/core/Button';
import columnsService from '../services/columnsService';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  ulList: {
    listStyle: 'none',
    display: 'flex'
  },
  ilList: {
    margin: '10px'
  }
};

let service;

const Board = props => {
  const { classes } = props;
  const hash = props.match.params.hash;

  const [columns, setColumns] = useState([]);

  const [isReady, setIsReady] = useState(false);

  useEffect(
    () => {
      async function fetchColumns () {
        const node = await ipfsService.getInstance();
        service = await columnsService(hash, node);
        const subscription = service.columns.subscribe(columns => {
          setColumns(columns);
          setIsReady(true);
        });
        return () => {
          subscription.unsubscribe();
        };
      }
      fetchColumns();
    },
    [hash]
  );

  const handleColumnUpdate = column => service.add(column);

  const handleColumnDelete = column => service.remove(column);

  const openInputModal = async () => {
    InputModal('', 'New Column', onConfirm);
  };

  const onConfirm = columnName => addColumn(columnName);

  const addColumn = async columnName => {
    const newColumn = { name: columnName, posts: [], date: Date.now() };
    await service.add(newColumn);
  };

  if (!isReady) {
    return null;
  }

  return (
    <div>
      <Button
        onClick={openInputModal}
        color="primary"
        variant="raised"
        data-automation="saveColumnButton"
      >
        Add Column
      </Button>

      <ul className={classes.ulList}>
        {columns.map(column => (
          <li className={classes.ilList} key={column._id}>
            <Column column={column} updateColumn={handleColumnUpdate} deleteColumn={handleColumnDelete}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

Board.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(Board);
