import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { storage } from '../../firebase/firebase';
import { Segment, Image, Form, Button, Grid } from 'semantic-ui-react';

const PostForm = ({ addPost, id, auth }) => {
  const [text, setText] = useState('');

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const handlePhoto = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = e => {
    e.preventDefault();
    const uploadTask = storage.ref(`postsimages/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('postsimages')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };

  return (
    <Form
      class='form my-1'
      onSubmit={e => {
        e.preventDefault();
        addPost({ text, type: id, photo: url });
        setText('');
        setUrl('');
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
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column>
                <input
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  onChange={handlePhoto}
                />
                <small className='form-text'>Optional</small>
              </Grid.Column>
              <Grid.Column>
                <Button type='submit' onClick={handleUpload}>
                  Upload
                </Button>
              </Grid.Column>
              <Grid.Column>
                {' '}
                {progress === 0 || progress === 100 ? (
                  <Button type='submit' value='Post' primary floated='right'>
                    Post
                  </Button>
                ) : (
                  <Button
                    disabled
                    type='submit'
                    value='Post'
                    primary
                    floated='right'
                  >
                    Post
                  </Button>
                )}
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
