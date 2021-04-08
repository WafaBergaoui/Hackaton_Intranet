import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import NavbarWithDrawer from '../layout/NavbarWithDrawer/NavbarWithDrawer';
import { editPost } from '../../store/actions/postActions';
import EditForm from './EditForm';

class PostEdit extends Component {
    handleSubmit = (e, post) => {
        e.preventDefault();
        console.log(post);
        const { id: postId } = this.props.match.params;
        const { date } = post;
        const months = [
            'Jan',
            'Feb',
            'March',
            'April',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        post.time = { day: `${day} ${months[month]}`, hourBegin: `${hour}: ${minute}` };
        this.props.editPost(postId, post);
        this.props.history.push('/my-posts');
    };

    render() {
        console.log(this.props);
        const { post } = this.props;
        const { id } = this.props.match.params;

        if (post) {
            return (
                <>
                    <NavbarWithDrawer pageName="Edit" />
                    <main>
                        <EditForm post={post} id={id} onHandleSubmit={this.handleSubmit} />
                    </main>
                </>
            );
        }
        return <h1>Loading...</h1>;
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);

    const { id } = ownProps.match.params;
    // eslint-disable-next-line prefer-destructuring
    const { posts } = state.firestore.data;
    const post = posts ? posts[id] : null;
    return {
        post,
    };
};

const mapDispatchToProps = dispatch => ({
    editPost: (postId, post) => dispatch(editPost(postId, post)),
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: 'posts' }])
)(PostEdit);
