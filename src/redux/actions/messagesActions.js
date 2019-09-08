export const SEND_MESSAGE = "SEND_MESSAGE";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const sendMessageRequest = (newMessage, roomId) => ({
  type: SEND_MESSAGE,
  meta: { remote: true },
  newMessage,
  roomId
});
