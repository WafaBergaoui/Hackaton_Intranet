import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { inPost, outPost } from '../../store/actions/postActions';

import NavbarWithDrawer from '../layout/NavbarWithDrawer/NavbarWithDrawer';

import '../../css/EventDetail.css';

library.add(faThumbsUp, faThumbsDown);

class PostDetail extends Component {
    enrollAction = (type, postId) => {
        console.log(type, postId);

        if (type === 'in') {
            this.props.inPost(postId);
        }

        if (type === 'out') {
            this.props.outPost(postId);
        }
    };

    checkIn = () => {
        const { post } = this.props;
        const userId = this.props.auth.uid;
        const { in: postIn } = post.participant;
        if (postIn.includes(userId)) {
            return 'btn-in-active';
        }
        return '';
    };

    checkOut = () => {
        const { post } = this.props;
        const userId = this.props.auth.uid;
        const { out: postOut } = post.participant;

        if (postOut.includes(userId)) {
            return 'btn-out-active';
        }
        return '';
    };

    render() {
        // const { id } = this.props.match.params;
        console.log(this.props);
        let postParticipantsNames = '';

        const { post, usersInfo } = this.props;
        if (post) {
            const id = this.props.postId;
            const { name, description, participant, time, location, type } = post;
            console.log('usersInfo:', usersInfo, ' ', 'participant in:', participant.in, ' ');

            if (usersInfo) {
                const postParticipants = usersInfo.filter(user =>
                    // console.log(user);
                    participant.in.includes(user.id)
                );

                console.log(postParticipants);

                postParticipantsNames = postParticipants.map((participant, i) => (
                    <p key={participant.name + i}>{participant.name}</p>
                ));

                console.log(postParticipantsNames);
            }
            console.log(postParticipantsNames);

            return (
                <>
                    <NavbarWithDrawer pageName="Event Info" />
                    <main className="event-info-page">
                        <div className={`event-hero event-${type}`}>
                            <h2 className="event-title">{name}</h2>
                        </div>
                        <small className="event-category">
                            Post category: <span>{type}</span>
                        </small>

                        <div className="event-actions">
                            <div className="enroll-buttons">
                                <button
                                    type="button"
                                    id={id}
                                    name="clickIn"
                                    className={`btn-enroll btn-in ${this.checkIn()}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        this.enrollAction('in', id);
                                    }}
                                >
                                    <FontAwesomeIcon icon="thumbs-up" />
                                    &nbsp;IN&nbsp;
                                </button>
                                <button
                                    type="button"
                                    name="clickOut"
                                    id={id}
                                    className={`btn-enroll btn-out ${this.checkOut()}`}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        this.enrollAction('out', id);
                                    }}
                                >
                                    <FontAwesomeIcon icon="thumbs-down" />
                                    <i className="icon icon-thumbs-down" />
                                    &nbsp;OUT
                                </button>
                            </div>
                        </div>

                        <div className="event-details-card container">
                            <div className="event-description event-info">
                                <h2>Post description</h2>
                                <p>{description}</p>
                            </div>

                            <div className="event-location event-info">
                                <h2>Post location</h2>
                                <p>{location}</p>
                            </div>

                            <div className="event-date event-info">
                                <h2>Date</h2>
                                <p>{time.day}</p>
                            </div>

                            <div className="event-timing event-info">
                                <h2>Time</h2>
                                <p>{time.hourBegin} - </p>
                            </div>

                            <div className="event-participants event-info">
                                <h2>Participants</h2>
                                <div>
                                    <p>{postParticipantsNames}</p>
                                </div>
                            </div>

                            <div className="event-more-info event-info">
                                <h2>More Info</h2>
                                <p>No extra information was provided</p>
                            </div>
                        </div>
                    </main>
                </>
            );
        }
        return <h1>Loading...</h1>;
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);

    const usersInfo = state.firestore.ordered.users;
    // console.log(usersInfo)

    const { id } = ownProps.match.params;
    // eslint-disable-next-line prefer-destructuring
    const { posts } = state.firestore.data;
    const post = posts ? posts[id] : null;
    return {
        post,
        usersInfo,
        postId: id,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = dispatch => ({
    inPost: postId => dispatch(inPost(postId)),

    outPost: postId => dispatch(outPost(postId))
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: 'posts' }, { collection: 'users' }])
)(PostDetail);
