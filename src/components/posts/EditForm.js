import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

class PostForm extends Component {
    state = {
        name: this.props.post.name,
        description: this.props.post.description,
        type: this.props.post.type,
        location: this.props.post.location,
        date: new Date(this.props.post.date.seconds * 1000),
        time: this.props.post.time,
    };

    handleDate = date => {
        this.setState(
            {
                date,
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

    render() {
        const { name, description, type, location, date, time } = this.state;
        return (
            <>
                <div style={{ margin: '10px 5vw' }}>
                    <h2 style={{ marginBottom: '10px' }}>Title: {name}</h2>
                    <h2 style={{ marginBottom: '10px' }}>Description: {description}</h2>
                    <h2 style={{ marginBottom: '10px' }}>Location: {location}</h2>
                    <h2 style={{ marginBottom: '10px' }}>Type of post: {type}</h2>
                    <h2 style={{ marginBottom: '10px' }}>Day: {time.day}</h2>
                    <h2 style={{ marginBottom: '10px' }}>Time: {time.hourBegin}</h2>
                </div>
                <form className="FormFields" style={{ marginTop: '40px' }}>
                    <input
                        style={{ display: 'block', margin: '10px auto' }}
                        className="FormField-Input"
                        placeholder={name}
                        name="name"
                        type="text"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <input
                        style={{ display: 'block', margin: '10px auto' }}
                        className="FormField-Input"
                        placeholder={description}
                        name="description"
                        type="text"
                        value={description}
                        onChange={this.handleChange}
                    />
                    <input
                        style={{ display: 'block', margin: '10px auto' }}
                        className="FormField-Input"
                        placeholder={location}
                        name="location"
                        type="text"
                        value={location}
                        onChange={this.handleChange}
                    />
                    <select
                        style={{ display: 'block', margin: '10px auto' }}
                        className="FormField-Select"
                        value={type}
                        name="type"
                        onChange={this.handleChange}
                        required
                    >
                        <option value="">-- Select your Event --</option>
                        <option value="Sport">Sport</option>
                        <option value="Meetup">Meetup</option>
                        <option value="Party">Party</option>
                        <option value="Presentation">Presentation</option>
                        <option value="Other">Other</option>
                    </select>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <DateTimePicker
                            disableClock
                            clearIcon={null}
                            format="dd-MM-y HH:mm"
                            type="date"
                            className="FormField-Calendar"
                            name="date"
                            id="eventDate"
                            onChange={this.handleDate}
                            value={date}
                        />
                    </div>

                    <button
                        style={{ display: 'block', margin: '40px auto' }}
                        className="FormField-Button"
                        type="submit"
                        onClick={e => this.props.onHandleSubmit(e, this.state)}
                    >
                        SAVE
                    </button>
                </form>
            </>
        );
    }
}
export default PostForm;
