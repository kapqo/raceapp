import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import GroupItem from './GroupItem';
import { getGroups } from '../../actions/group';
import {
  Card,
  Input,
  Header,
  Icon,
  Label,
  Grid,
  Button
} from 'semantic-ui-react';
import Pages from './Pages';

const Group = ({ getGroups, group: { groups, loading } }) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const [name, setName] = useState('');
  const [inp, setInp] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = groups.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  let groupz = groups
    .filter(group => group.name.toLowerCase().includes(inp.toLowerCase()))
    .slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header as='h1' icon textAlign='center'>
            <Icon name='car' circular />
            <Header.Content>Raceapp Groups</Header.Content>
          </Header>
          <Header as='h3' textAlign='center'>
            Connect your interests with other people! Join to our Groups!
            <p>
              <Input
                icon='users'
                iconPosition='left'
                placeholder='Search users...'
                onChange={e => {
                  let input = e.target.value;
                  setName(input);
                  setInp(input);
                }}
              />
            </p>
          </Header>
          <Grid columns='equal'>
            <Grid.Row></Grid.Row>
            <Grid.Column width={4}>
              <Link to='/add-group'>
                <Button>Click Here</Button>
              </Link>
            </Grid.Column>
            <Grid.Column stretched>
              <Label pointing='left' size='large'>
                Didn't find a group that suits you? Just create a new group by
                clicking here!
              </Label>
            </Grid.Column>
            <Grid.Row></Grid.Row>
          </Grid>

          <Card.Group centered itemsPerRow={3}>
            {loading ? (
              <Spinner />
            ) : (
              <Fragment>
                {groups.length > 0 ? (
                  groupz.map(group => (
                    <GroupItem key={group._id} group={group} />
                  ))
                ) : (
                  <h4>No groups found</h4>
                )}
              </Fragment>
            )}
          </Card.Group>
        </Fragment>
      )}
      <Pages
        postsPerPage={postsPerPage}
        totalPosts={groups.length}
        paginate={paginate}
      />
    </Fragment>
  );
};

Group.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroups })(Group);
