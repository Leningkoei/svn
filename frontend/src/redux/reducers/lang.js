const initState = "markdown";

export default (preState = initState, action) => {
  const type = action.type;
  const data = action.data;

  switch (type) {
    case "sendLang":
      return data;
    default:
      return preState;
  };
};

