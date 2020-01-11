import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
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
import { ConfirmationModal } from '../components/ConfirmationModal';

const styles = {
  list: {
    maxWidth: '400px',
  },
  addIcon: {
    fontSize: 26,
  },
  addButtonArea: {
    textAlign: 'center'
  },
  column: {
    padding: '20px',
    width: '400px',
  },
  input: {
    width: '100%'
  },
  delete: {
    textAlign: 'end'
  }
};

const Column = props => {

  const { classes } = props;
  
  const [column, setColumn] = useState(props.column);
  const [isEditingPost, setEditingPost] = useState(false);
  
  // const handleDeletePost = post => service.remove(post);
  
  const addCard = () => {
    setEditingPost(true);
    column.posts.push({ id: uuid(), text: '', date: Date.now() });
    setColumn(column);
    props.updateColumn(column);
  };

  const updateColumnName = event => {
    column.name = event.target.value;
    setColumn(column);
    props.updateColumn(column);
  };

  const updateColumnPost = (editedPost) => {
    const post = column.posts.find(post => post.id === editedPost.id);
    const index = column.posts.indexOf(post);
    column.posts[index] = editedPost;
    setColumn(column);
    props.updateColumn(column);
  };

  const deleteColumnPost = (deletedPost) => {
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
          <TextField
            id="columnName"
            label="Column Name"
            variant="outlined"
            value={column.name}
            className={classes.input}
            onChange={updateColumnName}
          />
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
                <Card post={post} isEditingPost={isEditingPost} updatePost={updateColumnPost} deletePost={deleteColumnPost}/>
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