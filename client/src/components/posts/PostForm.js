import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Segment, Image, Form, Button, Grid } from 'semantic-ui-react';

const PostForm = ({ addPost, id, auth }) => {
  const [text, setText] = useState('');

  return (
    <Form
      class='form my-1'
      onSubmit={e => {
        e.preventDefault();
        addPost({ text, type: id });
        setText('');
      }}
    >
      <Segment.Group>
        <Segment raised color='green' clearing>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Image
                  rounded
                  size='tiny'
                  src={auth.user.avatar}
                  floated='left'
                />
              </Grid.Column>
              <Grid.Column width={14}>
                <p>
                  <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Enter text here...'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                  ></textarea>
                </p>
                <Button type='submit' value='Post' primary floated='right'>
                  Post
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    </Form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);
