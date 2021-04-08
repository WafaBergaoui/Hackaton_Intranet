import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { createPost, resetPost } from '../../store/actions/postActions';
import { Redirect } from 'react-router-dom';


import '../../css/CreateEvent.css';
import NavbarWithDrawer from '../layout/NavbarWithDrawer/NavbarWithDrawer';

class CreatePost extends Component {
    state = {
        name: '',
        description: '',
        type: 'Other',
        location: '',
        date: new Date(),
        time: {},
        moreInfo: ''
    };

    handleDate = date => {
        this.setState(
            {
                date
            },
            () => {
                console.log(this.state);
            }
        );
    };

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { date } = this.state;
        const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        console.log(`${day} ${months[month]}`, `${hour}:${minute}`);

        this.setState(
            {
                time: { day: `${day} ${months[month]}`, hourBegin: `${hour}:${minute}` }
            },
            () => {
                console.log('the post created with the following data:');
                console.log(this.state);
                this.props.createPost(this.state);
            }
        );

        // this.props.history.push('/');
    };

    render() {
        const { postName, postDescription, postType, postLocation, date } = this.state;

       /* if (this.props.post.id) {
            // redirect after they add post
            // console.log(this.props.post);
            this.props.resetPost();
            return <Redirect to={`/post/${this.props.post.id}`} />;
        }*/
        
        return (
            <>
                <NavbarWithDrawer pageName="Create Event" />
                <main>
                    <div className="CreateEvent">
                        <div className="CreateEvent-Form">
                            <form className="FormFields">
                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventName">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="postName"
                                        value={postName}
                                        className="FormField-Input"
                                        placeholder="Title of your blog"
                                        name="name"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventDescription">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="postDescription"
                                        value={postDescription}
                                        className="FormField-Input"
                                        placeholder="What are you organising?"
                                        name="description"
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventType">
                                        Type of Event
                                    </label>
                                    <select
                                        className="FormField-Select"
                                        value={postType}
                                        name="type"
                                        onChange={this.handleChange}
                                        required
                                    >
                                        <option value={this.state.type}>-- Select your Event --</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Meetup">Meetup</option>
                                        <option value="Party">Party</option>
                                        <option value="Presentation">Presentation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventLocation">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="postLocation"
                                        value={postLocation}
                                        className="FormField-Input"
                                        placeholder="Place, room, or address"
                                        name="location"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="FormField">
                                    <label className="FormField-Label" htmlFor="eventDate">
                                        Date
                                    </label>
                                    <DateTimePicker
                                        disableClock
                                        clearIcon={null}
                                        format="dd-MM-y HH:mm"
                                        type="date"
                                        className="FormField-Calendar"
                                        name="date"
                                        id="postDate"
                                        onChange={this.handleDate}
                                        value={date}
                                    />
                                </div>


                                <div className="FormField">
                                    <button type="submit" className="FormField-Button" onClick={this.handleSubmit}>
                                        Create Blog
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        post: state.post
    };
};

const mapDispatchToProps = dispatch => ({
    createPost: post => dispatch(createPost(post)),
    resetPost: () => dispatch(resetPost())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost);
