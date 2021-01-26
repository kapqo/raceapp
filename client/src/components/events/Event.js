import React, { Fragment, useEffect } from "react";
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
} from "../../actions/event";
import EventItem from "./EventItem";
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
  event: { event, loading },
  auth: { user },
  post: { posts },
  match,
}) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  //Show only posts of this event
  const result = posts.filter(post => post.type === event._id);

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
              <Segment>Organizer: {event.organizer}</Segment>
              <Segment>
                Date: <Moment format="YYYY/MM/DD">{event.date}</Moment>
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
              <Segment textAlign="center">
                {event.sure.find((sure) => sure.user === user._id) ? (
                  <Button color="red" onClick={(e) => removeSure(event._id)}>
                    Leave
                  </Button>
                ) : event.unsure.find((unsure) => unsure.user === user._id) ? (
                  <Button color="red" onClick={(e) => removeUnsure(event._id)}>
                    Leave
                  </Button>
                ) : (
                  <div>
                    <Button color="green" onClick={(e) => addSure(event._id)}>
                      I'am in!
                    </Button>
                    <Button
                      color="yellow"
                      onClick={(e) => addUnsure(event._id)}
                    >
                      I'am interested
                    </Button>
                  </div>
                )}
                {/* {event.unsure.find(unsure => unsure.user === user._id) ? (
                  <Button color='red' onClick={e => removeUnsure(event._id)}>
                    Leave
                  </Button>
                ) : null} */}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>Description: {event.description}</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column >
              <div className="postactions">
                <Segment>
                    <PostForm id={event._id} />
                  <div className="posts">
                    {result.map((post) => (
                      <PostItem key={post._id} post={post} />
                    ))}
                  </div>
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
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
})(Event);
