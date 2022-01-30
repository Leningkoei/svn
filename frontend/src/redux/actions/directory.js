export const changeFold = path => ({
    type: "changeFold",
    data: path
});
export const createDirectory = path => ({
    type: "createDirectory",
    data: path
});
export const uploadFile = path => ({
    type: "uploadFile",
    data: path
});

