export const createPost = post => (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const { profile } = getState().firebase;
    const authorId = getState().firebase.auth.uid;
    console.log(profile);

    firestore
        .collection("posts")
        .add({
            ...post,
            authorId,
          //  authorName: profile.name,
            participant: { total: 15, in: [], out: [] },
        })
        .then(res => {
            console.log(res);
            dispatch({ type: 'CREATE_POST', post: { ...post, id: res.id } });
        })
        .catch(err => {
            dispatch({ type: 'CREATE_POST_ERROR', err });
        });
};

export const resetPost = () => ({ type: 'RESET_POST' });

export const editPost = (postId, post) => (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    // make async call to database
    const firestore = getFirestore();
    const { profile } = getState().firebase;
    const authorId = getState().firebase.auth.uid;
    console.log(postId, ' ', post);

    firestore
        .collection('posts')
        .doc(postId)
        .update(post)
        .then(() => {
            console.log('update success');
            // dispatch({ type: 'CREATE_POST', post: { ...post, id: res.id } });
        })
        .catch(err => {
            console.log(err);
            // dispatch({ type: 'CREATE_POST_ERROR', err });
        });
};

export const inPost = postId => (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const { profile } = getState().firebase;
    const authorId = getState().firebase.auth.uid;

    firestore
        .collection('posts')
        .doc(postId)
        .update({
            'participant.in': firestore.FieldValue.arrayUnion(authorId),
            'participant.out': firestore.FieldValue.arrayRemove(authorId),
        })
        .then(() => {
            dispatch({ type: 'IN_POST', postId });
        })
        .catch(err => {
            dispatch({ type: 'IN_POST_ERROR', err });
        });
};

export const outPost = postId => (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const { profile } = getState().firebase;
    const authorId = getState().firebase.auth.uid;

    firestore
        .collection('posts')
        .doc(postId)
        .update({
            'participant.in': firestore.FieldValue.arrayRemove(authorId),
            'participant.out': firestore.FieldValue.arrayUnion(authorId),
        })
        .then(() => {
            dispatch({ type: 'OUT_POST', postId });
        })
        .catch(err => {
            dispatch({ type: 'OUT_POST_ERROR', err });
        });
};

export const deletePost = postId => (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
        .collection('posts')
        .doc(postId)
        .delete();
    // .then(() => {
    //     dispatch({ type: 'IN_POST', postId });
    // })
    // .catch(err => {
    //     dispatch({ type: 'IN_POST_ERROR', err });
    // });
};
