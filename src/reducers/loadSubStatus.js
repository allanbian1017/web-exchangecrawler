const loadSubStatus = (state = true, action) => {
  switch (action.type) {
    case 'CHANGE_LOAD_SUBSCRIBE_STATUS':
      return action.load;
    default:
      return state;
  }
};

export default loadSubStatus;
