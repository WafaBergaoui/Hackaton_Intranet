const initState = {};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_POST':
            console.log(state);
            console.log('create project', action.post);
            return { ...state, ...action.post };
        case 'CREATE_POST_ERROR':
            console.log('CREATE_POST_ERROR', action.err);
            return state;
        case 'RESET_POST':
            console.log('RESET_POST');
            return { ...state, id: null };
        case 'IN_POST':
            console.log('in post  ', action.postId);
            return state;
        case 'IN_POST_ERROR':
            console.log('in post error', action.err);
            return state;
        case 'OUT_POST':
            console.log('out post  ', action.postId);
            return state;
        case 'OUT_POST_ERROR':
            console.log('out post error', action.err);
            return state;
        default:
            return state;
    }
};

export default postReducer;
