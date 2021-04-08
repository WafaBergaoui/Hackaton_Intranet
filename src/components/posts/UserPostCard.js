import React, { Component } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import {Card , Button} from 'react-bootstrap';
import '../../css/UserPost.css';

class UserPostCard extends Component {
    state = {
        isdeleted: false,
        isedited: false,
        deletedId: [],
    };

    handleDelete = e => {
        const { isdeleted } = this.state;
        const { id } = this.props.post;

        this.props.deleteAction(id);
        // this.props.(this.state); 
        console.log('event id:', this.props.event.id);
    };

    clicPostEdit = () => {
        console.log(this.props);

        // return <Redirect to={`'/event/' ${this.props.event.id} `} />;
        this.props.history.push(`/post/edit/${this.props.post.id}`);
    };

    render() {
        const { post } = this.props;
        const { name, description, participant, time, location, type, id } = post;
        const value = participant.in.length === 0 ? '0' : participant.in.length;
        return (
            // <NavLink to = {filteredEventids}
            
            <Card border="dark" style={{ width: '200rem' }}>
             <Card.Body key={id} >
                <Card.Title className="event-title">{name}</Card.Title>
                <Card.Text >{description}</Card.Text>
                <Button className="btn-edit" onClick={this.clicPostEdit}>Edit</Button>
                <Button className=" btn-delete" onClick={this.handleDelete}>Delete</Button>
             </Card.Body> 
            </Card>            
        );
        // </NavLink>
    }
}

export default UserPostCard;
