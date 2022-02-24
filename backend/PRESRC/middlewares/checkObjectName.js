export const checkObjectNameFromForm = (req, res, next) => {
    const user = req.user;

    if (!user) throw new Error("[Middleware] User Not Find!");

    // req.body is `{}` but not understand;
    const path = req.body.path.split(",");

    if (checkObjectName(user, path)) {
        next();
    } else {
        res.send(failRes);
    };
};
export const checkObjectNameFromURL = (req, res, next) => {
    const user = req.user;

    if (!user) throw new Error("[Middleware] User Not Find!");

    const path = req.query.path;

    if (checkObjectName(user, path)) {
        next();
    } else {
        res.send(failRes);
    };
};

const failRes = {
    result: false,
    msg: "This name has been exist in this fold!"
};

const checkObjectName = (user, path) => {
    const rootDirectory = user.getRootDirectory();
    const currentDirectory = rootDirectory.getCurrentObject(path);
    const pathOfCurrentDirectory = currentDirectory.getPath();

    console.log(pathOfCurrentDirectory);
    console.log(path);
    console.log(pathOfCurrentDirectory.length, path.length);

    return !(pathOfCurrentDirectory.length == path.length);
};

