import React, { Component } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faThumbsDown);

export default class PostDashboard extends Component {
    
    checkIn = () => {
        const { post, userId } = this.props;
        const { in: postIn } = post.participant;
        if (postIn.includes(userId)) {
            return 'btn-in-active';
        }
        return '';
    };

    checkOut = () => {
        const { post, userId } = this.props;
        const { out: postOut } = post.participant;

        if (postOut.includes(userId)) {
            return 'btn-out-active';
        }
        return '';
    };

    handleEnroll = e => {
        const postId = e.target.id;

        switch (e.target.name) {
            case 'clickIn':
                this.props.enrollAction('in', postId);
                break;
            case 'clickOut':
                this.props.enrollAction('out', postId);
                break;
            default:
                break;
        }
    };

    clickPostDetail = () => {
        console.log(this.props);
        // return <Redirect to={`'/event/' ${this.props.event.id} `} />;
        this.props.history.push(`/post/${this.props.post.id}`);
    };

    render() {
        const { post } = this.props;

        // console.log(post);

        const { name, participant, time, location, type, id } = post;
        const value = participant.in.length === 0 ? '0' : participant.in.length;
        return (
            <div className={`post-card post-${type}`} key={id}>
                <div className="post-header" onClick={this.clickPostDetail}>
                    <h2 className="post-title" style={{ cursor: 'pointer' }}>
                        {name}
                    </h2>
                    <div className="progress">
                        <CircularProgressbar
                            value={participant.in.length}
                            maxValue={20}
                            text={value}
                            background="true"
                            styles={{
                                // Customize the root svg element
                                root: {},
                                // Customize the path, i.e. the "completed progress"
                                path: {
                                    // Path color
                                    stroke: 'green',
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Customize transition animation
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    // Rotate the path
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                },
                                // Customize the circle behind the path, i.e. the "total progress"
                                trail: {
                                    // Trail color
                                    stroke: 'lightgray',
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Rotate the trail
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                },
                                // Customize the text
                                text: {
                                    // Text color
                                    fill: 'black',
                                    // Text size
                                    fontSize: '3rem',
                                    fontWeight: 'bolder',
                                },
                                // Customize background - only used when the `background` prop is true
                                background: {
                                    fill: 'white',
                                },
                            }}
                        />{' '}
                    </div>
                </div>

                <div className="enroll-buttons">
                    <button
                        type="button"
                        id={id}
                        name="clickIn"
                        className={`btn-enroll btn-in ${this.checkIn()}`}
                        style={{ cursor: 'pointer' }}
                        onClick={this.handleEnroll}
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
                        onClick={this.handleEnroll}
                    >
                        <FontAwesomeIcon icon="thumbs-down" />
                        <i className="icon icon-thumbs-down" />
                        &nbsp;OUT
                    </button>
                </div>

                <div className="post-details">
                    <div className="date-time-dashboard">
                        <h3 className="date">
                            <span>{time.day}</span>
                        </h3>
                        <h3 className="time">{time.hourBegin}</h3>
                    </div>
                    <h3 className="location">{location}</h3>
                </div>
            </div>
        );
    }
}
