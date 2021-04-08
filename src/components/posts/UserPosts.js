import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import UserPostCard from './UserPostCard';
import NavbarWithDrawer from '../layout/NavbarWithDrawer/NavbarWithDrawer';
import { deletePost } from '../../store/actions/postActions';

// import '../../css/Attending.css';

const postInitial = [];

class UserPosts extends Component {
    deleteAction = id => {
        console.log('deleted');

        this.props.deletePost(id);
    };

    render() {
        console.log(this.props.auth);
        console.log(this.props.userPosts);

        const posts = this.props.userPosts;

        const userId = this.props.auth.uid;

        const postsFilter =
            posts &&
            posts.filter(post => {
                if (post.authorId === userId) {
                    return post;
                }
            });

        const renderUserPosts =
            postsFilter &&
            postsFilter.map(post => (
                <UserPostCard
                    key={post.id}
                    post={post}
                    history={this.props.history}
                    deleteAction={this.deleteAction}
                />
            ));

        return (
            <>
                <NavbarWithDrawer pageName="My Posts" />
                <main>
                    <section className="user-posts-section">
                        <div className="user-posts container">{renderUserPosts}</div>
                    </section>
                </main>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    deletePost: post => dispatch(deletePost(post)),
});

const mapStateToProps = state => {
    const { posts } = state.firestore.ordered;
    return {
        userPosts: posts,
        auth: state.firebase.auth,
    };
};
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: 'posts' }])
)(UserPosts);
