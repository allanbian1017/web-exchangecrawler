const subStatus = (state = false, action) => {
  switch (action.type) {
    case 'CHANGE_SUBSCRIBE_STATUS':
      return action.status;
    default:
      return state;
  }
};

export default subStatus;
