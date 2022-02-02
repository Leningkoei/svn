const initState = null;
export default (preState = initState, action) => {
    const type = action.type;
    const data = action.data;

    switch (type) {
        case "refreshRootDirectory":
            return data;
        default:
            return preState;
    };
};

