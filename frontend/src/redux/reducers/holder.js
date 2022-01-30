import { nanoid } from "nanoid";

const initState = {
    id: nanoid(),
    type: "directory",
    path: [ "root" ],
    fold: false,
    children: [
        {
            id: nanoid(),
            type: "directory",
            path: [ "root", "first" ],
            fold: false,
            children: [
                {
                    id: nanoid(),
                    type: "file",
                    path: [ "root", "first", "a.jsx" ]
                },
                {
                    id: nanoid(),
                    type: "file",
                    path: [ "root", "first", "b.jsx" ]
                },
                {
                    id: nanoid(),
                    type: "file",
                    path: [ "root", "first", "c.jsx" ]
                }
            ]
        },
        {
            id: nanoid(),
            type: "directory",
            path: [ "root", "second" ],
            fold: false,
            children: []
        },
        {
            id: nanoid(),
            type: "directory",
            path: [ "root", "third" ],
            fold: false,
            children: []
        }
    ]
};

export default (preState = initState, action) => {
    const type = action.type;
    const data = action.data;

    switch (type) {
        case "changeFold":
            console.log("change fold");

            return preState;
        case "createDirectory":
            console.log("Add a directory.");
            console.log("Path is ", data);

            return {};
        case "uploadFile":
            console.log("Add a file.");
            console.log("Path is ", data);

            return initState;
        default:
            return preState;
    };
};

