export const GET_ROOM_DATA_REQUEST = "GET_ROOM_DATA_REQUEST";
export const GET_ROOM_DATA_REQUEST_SUCCESS = "GET_ROOM_DATA_REQUEST_SUCCESS";
export const GET_ROOM_DATA_REQUEST_FAILURE = "GET_ROOM_DATA_REQUEST_FAILURE";

export const getRoomDataRequest = () => ({
  type: GET_ROOM_DATA_REQUEST,
  meta: { remote: true }
});
