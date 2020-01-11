import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { ConfirmationModal } from './ConfirmationModal';

const styles = {
  container: {
    minHeight: '80px',
    width: '100%',
  },
  content: {
    paddingBottom: 0,
  },
  header: {
    paddingBottom: 0,
    position: 'absolute',
    right: '15px',
    top: '-2px',
  },
  textField: {
    margin: 0,
    width: '100%',
  },
  editIcon: {
    fontSize: 14,
  },
  deleteIcon: {
    fontSize: 14,
  },
  actionButton: {
    fontSize: '.5em',
    minHeight: '0',
  },
};

const Card = props => {
  const { post, classes, isEditingPost } = props;
  const [isEditing, setEditing] = useState(isEditingPost);
  const [newText, setNewText] = useState('');

  const enterEditMode = () => setEditing(true);
  const handleChange = event => setNewText(event.target.value);
  const handleCancel = () => setEditing(false);
  const removeCard = async () => {
    const onConfirm = () => props.deletePost(props.post);
    ConfirmationModal('Are you sure?', 'Delete Card', onConfirm);
  };

  const handleSave = () => {
    setEditing(false);
    const post = { ...props.post, ...{ text: newText } };
    props.updatePost(post);
  };

  return (
    <MCard className={classes.container}>
      {!isEditing && (
        <CardHeader
          className={classes.header}
          action={
            <Fragment>
              <IconButton
                className={classes.edit}
                aria-label="Edit"
                data-automation="editButton"
                onClick={enterEditMode}
              >
                <Edit className={classes.editIcon} />
              </IconButton>

              <IconButton
                className={classes.delete}
                aria-label="Remove"
                data-automation="deleteButton"
                onClick={removeCard}
              >
                <Delete className={classes.deleteIcon} />
              </IconButton>
            </Fragment>
          }
        />
      )}
      <CardContent className={classes.content}>
        {!isEditing && (
          <Typography data-automation="text">{post.text}</Typography>
        )}

        {isEditing && (
          <TextField
            data-automation="textField"
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
            defaultValue={post.text}
            onChange={handleChange}
          />
        )}
      </CardContent>
      {isEditing && (
        <CardActions>
          <Button
            className={classes.actionButton}
            onClick={handleCancel}
            data-automation="cancel"
          >
            Cancel
          </Button>

          <Button
            className={classes.actionButton}
            onClick={handleSave}
            color="primary"
            data-automation="saveButton"
          >
            Save
          </Button>
        </CardActions>
      )}
    </MCard>
  );
};

Card.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object,
  isEditingPost: PropTypes.bool,
  deletePost: PropTypes.func,
  updatePost: PropTypes.func
};

export default withStyles(styles)(Card);
