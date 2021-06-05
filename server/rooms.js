const rooms = {};

const addRoom = (user, users) => {
  const updated = { ...rooms };
  updated[`${user.room}`] = user.room;
  // updated[`${newRoom.room}`].users = users;
  // console.log(updated);
  // console.log(users);
  updated[`${user.room}`].users = users;
};
console.log(rooms);

module.exports = { addRoom };
