import React, { Fragment, useEffect, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import PostForm from "../posts/PostForm";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import Moment from "react-moment";
import {
  getEvent,
  addSure,
  addUnsure,
  removeSure,
  removeUnsure,
  deleteEvent,
} from "../../actions/event";
import {
  Container,
  Grid,
  Segment,
  Label,
  Icon,
  Button,
} from "semantic-ui-react";

const Event = ({
  getEvent,
  getPosts,
  addSure,
  addUnsure,
  removeSure,
  removeUnsure,
  deleteEvent,
  event: { event, loading },
  auth: { user },
  post: { posts },
  match,
}) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  //Show only posts of this event
  const result = posts.filter((post) => post.type === match.params.id);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/events" className="btn btncustom">
        Back to events
      </Link>
      <Container>
        <Grid columns={"equal"} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>Title: {event.title}</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column width={5}>
              <Segment>
                Organizer:{" "}
                <Link to={`/profile/${event.organizer}`}>
                  <Label image>
                    <img src={event.avatar} />
                    {event.name}
                  </Label>
                </Link>
              </Segment>
              {event.organizer === user._id ? (
                <Button.Group>
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="ui grey button"
                  >
                    Edit Event
                  </Link>
                  <Button.Or />
                  <Button color="red" onClick={(e) => deleteEvent(event._id)}>
                    Delete event
                  </Button>
                </Button.Group>
              ) : null}
              <Segment>
                Date: <Moment format="YYYY/MM/DD">{event.date}</Moment>
                {event.time.length > 0 ? (
                  <div>Start:{" " + event.time}</div>
                ) : null}
              </Segment>
              <Segment textAlign="center">
                Location:{" "}
                <Button as="div" floated="right" labelPosition="left">
                  <Label as="a" basic pointing="right">
                    {event.location}
                  </Label>
                  <Button icon>
                    <Icon name="map marker alternate" />
                  </Button>
                </Button>
              </Segment>
              <Segment textAlign="center">
                <Label>
                  <Icon name="checkmark" color="green" />
                  Attending:{"  " + event.sure.length}
                </Label>
                <Label>
                  <Icon name="question" color="yellow" />
                  Interested:{"  " + event.unsure.length}
                </Label>
              </Segment>
              {event.sure.find((sure) => sure.user === user._id) ? (
                <Button color="red" onClick={(e) => removeSure(event._id)}>
                  Leave
                </Button>
              ) : event.unsure.find((unsure) => unsure.user === user._id) ? (
                <Button color="red" onClick={(e) => removeUnsure(event._id)}>
                  Leave
                </Button>
              ) : (
                <Button.Group>
                  <Button color="green" onClick={(e) => addSure(event._id)}>
                    I'am in!
                  </Button>
                  <Button.Or />
                  <Button color="yellow" onClick={(e) => addUnsure(event._id)}>
                    I'am interested
                  </Button>
                </Button.Group>
              )}
            </Grid.Column>
            <Grid.Column>
              <Segment>Description: {event.description}</Segment>
            </Grid.Column>
          </Grid.Row>
          <Container>
            <div className="postactions">
              <PostForm id={event._id} />
              <div className="posts">
                {result.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </div>
            </div>
          </Container>
        </Grid>
      </Container>
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addUnsure: PropTypes.func.isRequired,
  addSure: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  renoveUnsure: PropTypes.func.isRequired,
  removeSure: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getEvent,
  getPosts,
  addSure,
  addUnsure,
  removeSure,
  removeUnsure,
  deleteEvent,
})(Event);
