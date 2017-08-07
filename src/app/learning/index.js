const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
    const {type, error, payload} = action;
    switch (type) {
        default:
            return {type: "learning"};
    }
}