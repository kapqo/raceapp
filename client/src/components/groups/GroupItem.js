import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import { getProfileById } from '../../actions/profile';
import { addNotification } from '../../actions/notification';
import {
  Card,
  Label,
  Image,
  Icon,
  Segment,
  Header,
  Modal,
  Button,
  Grid,
  Comment,
  Dropdown
} from 'semantic-ui-react';
import { deleteGroup, addMember, removeMember } from '../../actions/group';

const GroupItem = ({
  addMember,
  removeMember,
  deleteGroup,
  getProfileById,
  addNotification,
  auth: { user },
  profile: { profile, loading },
  group: {
    _id,
    name,
    avatar,
    status,
    description,
    members,
    admin,
    adminname,
    adminavatar,
    group
  },
  post: { posts },
  getPosts
}) => {
  useEffect(() => {
    getProfileById(admin);
  }, [getProfileById, admin]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const memberOption = members.map(member => ({
    key: member._id,
    text: member.name,
    image: { avatar: true, src: member.avatar },
    value: member.user
  }));

  //Show only posts of this group
  const result = posts.filter(post => post.type === _id);

  //const resultM = members.filter(group => group.members === user._id )

  const [open, setOpen] = React.useState(false);

  const addMemberFn = id => {
    addMember(id).then(() => {
      addNotification({
        text: `joined a group called ${name}, check our groups`,
        link: 'http://localhost:3000/groups'
      });
    });
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Card>
        {avatar !== '' ? (
          <Image src={avatar} wrapped ui={false} />
        ) : (
          <Segment>
            <Header icon>
              <Icon name='image outline' />
              No avatar added
            </Header>
          </Segment>
        )}
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{status === true ? 'Private' : 'Public'}</Card.Meta>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {members.length} Members
          </a>
        </Card.Content>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Show more</Button>}
        >
          <Modal.Header>{name}</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Grid columns='equal' divided container>
                <Grid.Row stretched>
                  <Grid.Column width={4}>
                    {avatar !== '' ? (
                      <Image size='medium' src={avatar} wrapped />
                    ) : (
                      <Segment placeholder>
                        <Header icon>
                          <Icon name='image outline' />
                          No avatar added for this group.
                        </Header>
                      </Segment>
                    )}
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Segment vertical>
                      <Label color={'green'}>Admin:</Label>
                      <Link to={`/profile/${admin}`}>
                        <Label image>
                          <img src={adminavatar} />
                          {adminname}
                        </Label>
                      </Link>
                    </Segment>

                    <Segment vertical>
                      <Label>Description:</Label>
                      <label>{' ' + description}</label>
                    </Segment>
                    <Segment vertical>
                      <Dropdown
                        button
                        floating
                        labeled
                        className='icon'
                        icon='search'
                        text={`Members: ${members.length}`}
                        options={memberOption}
                      >
                        <Dropdown.Menu>
                          {memberOption.map(option => (
                            <Link to={`/profile/${option.value}`}>
                              <div className='m-1'>
                                <Dropdown.Item key={option.value} {...option} />
                              </div>
                            </Link>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {members.find(members => members.user === user._id) ? (
                        <Button
                          onClick={e => removeMember(_id)}
                          type='button'
                          color='red'
                          floated='right'
                        >
                          Leave group
                        </Button>
                      ) : (
                        <Button
                          onClick={e => addMemberFn(_id)}
                          type='button'
                          color='olive'
                          floated='right'
                        >
                          Join in
                        </Button>
                      )}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                  <Grid.Column>
                    <div className='postactions'>
                      {status === true &&
                      !members.find(members => members.user === user._id) ? (
                        <Segment>
                          <Header>
                            Group is private. Join us to see more!
                          </Header>
                        </Segment>
                      ) : (
                        <Segment>
                          <Header>Group wall</Header>
                          {members.find(
                            members => members.user === user._id
                          ) ? (
                            <PostForm id={_id} />
                          ) : null}
                          <Comment.Group size='massive'>
                            {result.map(post => (
                              <PostItem key={post._id} post={post} />
                            ))}
                          </Comment.Group>
                        </Segment>
                      )}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {user._id === admin ? (
              <Link to={`/edit-group/${_id}`} className='ui grey button'>
                Edit
              </Link>
            ) : null}
            {user._id === admin ? (
              <button
                onClick={() => deleteGroup(_id)}
                className='ui negative button'
              >
                Delete
              </button>
            ) : null}
            <Button primary onClick={() => setOpen(false)}>
              Close <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
      </Card>
    </Fragment>
  );
};

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  removeMember: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  addMember,
  getPosts,
  getProfileById,
  deleteGroup,
  removeMember,
  addNotification
})(GroupItem);
