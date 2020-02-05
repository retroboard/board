import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Card from '../components/Card';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import MCard from '@material-ui/core/Card';
import uuid from 'uuid/v4';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { InputModal } from './InputModal';

const styles = {
  list: {
    maxWidth: '400px',
  },
  addIcon: {
    fontSize: 26,
  },
  addButtonArea: {
    textAlign: 'center',
  },
  column: {
    padding: '20px',
    width: '400px',
  },
  columnName: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: '#3f51b5',
    border: 'none',
    outline: 'none',
    padding: '0',
    fontSize: '1rem',
    width: '100%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '50px',
    justifyContent: 'center',
  },
  name: {
    margin: '10px 10px 10px 20px',
  },
  delete: {
    textAlign: 'end',
  },
  edit: {
    margin: '10px 20px 10px 10px',
    cursor: 'pointer',
  },
};

const Column = props => {
  const { classes } = props;

  const [column, setColumn] = useState(props.column);
  const [isEditingPost, setEditingPost] = useState(false);

  const addCard = () => {
    setEditingPost(true);
    column.posts.push({ id: uuid(), text: '', date: Date.now(), vote: 0 });
    setColumn(column);
    props.updateColumn(column);
  };

  const openInputModal = async () => {
    InputModal(column.name, 'Edit Column Name', onConfirm);
  };

  const onConfirm = columnName => updateColumnName(columnName);

  const updateColumnName = async columnName => {
    column.name = columnName;
    setColumn(column);
    props.updateColumn(column);
  };

  const updateColumnPost = editedPost => {
    const post = column.posts.find(post => post.id === editedPost.id);
    const index = column.posts.indexOf(post);
    column.posts[index] = editedPost;
    setColumn(column);
    props.updateColumn(column);
  };

  const deleteColumnPost = deletedPost => {
    const post = column.posts.find(post => post.id === deletedPost.id);
    const index = column.posts.indexOf(post);
    column.posts.splice(index, 1);
    setColumn(column);
    props.updateColumn(column);
  };

  const removeColumn = async () => {
    const onConfirm = () => props.deleteColumn(column);
    ConfirmationModal('Are you sure?', 'Delete Column', onConfirm);
  };

  return (
    <MCard className={classes.column}>
      <Grid container>
        <Grid className={classes.delete} xs={12}>
          <IconButton
            aria-label="Remove"
            data-automation="deleteButton"
            onClick={removeColumn}
          >
            <Delete />
          </IconButton>
        </Grid>
        <Grid xs={12}>
          <div className={classes.columnName}>
            <span className={classes.name}>{column.name}</span>
            <Edit onClick={openInputModal} className={classes.edit} />
          </div>
        </Grid>
        <Grid className={classes.addButtonArea} xs={12}>
          <IconButton
            className={classes.delete}
            aria-label="Add"
            data-automation="addButton"
            onClick={addCard}
          >
            <Add className={classes.addIcon} />
          </IconButton>
        </Grid>
        <Grid xs={12}>
          <List className={classes.list}>
            {column.posts.map(post => (
              <ListItem key={post._id}>
                <Card
                  post={post}
                  isEditingPost={isEditingPost}
                  updatePost={updateColumnPost}
                  deletePost={deleteColumnPost}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </MCard>
  );
};

Column.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object,
  column: PropTypes.object,
  deleteColumn: PropTypes.func,
  updateColumn: PropTypes.func,
};

export default withStyles(styles)(Column);
