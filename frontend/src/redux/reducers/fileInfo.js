const initState = {
  name: "Hello"
};

export default (preState = initState, action) => {
  const type = action.type;
  const data = action.data;

  switch (type) {
    case "sendFileInfo":
      return data;
    default:
      return preState;
  };
};

