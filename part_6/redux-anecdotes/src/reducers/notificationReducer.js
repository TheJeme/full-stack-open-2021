let timeId = 0;

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data.notification;
    }
    default:
      return state;
  }
};

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    clearTimeout(timeId);
    timeId = setTimeout(
      () =>
        dispatch({
          type: "SET_NOTIFICATION",
          data: {
            notification: null,
          },
        }),
      seconds * 1000 // seconds * milliseconds
    );

    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        notification,
      },
    });
  };
};

export default notificationReducer;
