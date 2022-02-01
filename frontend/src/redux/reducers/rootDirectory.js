import axios from "axios";

refreshRootDirectory = async name => {
    try {
        const res = await axios.get(
            "http://127.0.0.1:1024/server/root-directory",
            { params: { name } }
        );
        const rootDirectory = res.data.rootDirectory;

        return rootDirectory;
    } catch (err) {
        alert(err);
    };
};

initState = [];
export default async (preState = initState, action) => {
    const type = action.type;
    const data = action.data;

    switch (type) {
        case "refreshRootDirectory":
            return await refreshRootDirectory(data.name);
        case "changeFold":
            return await refreshRootDirectory(data.name);
        case "uploadFile":
            return await refreshRootDirectory(data.name);
        default:
            return preState;
    };
};

