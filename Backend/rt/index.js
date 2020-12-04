const socketio = require("socket.io");
const io = socketio();

const characters = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
  'abcdefghijklmnopqrstuvwxyz' + 
  '0123456789';

const makeId = (length) => {
  let result = '';
  for (let i = 0; i < length; i++ ) {
    result += characters[
      Math.floor(
        Math.random() * characters.length
      )
    ];
  }
  return result;
};

/*
rooms:
[
  {
    id: string,
    first: {
      id: number,
      socket: socket,
    },
    second: {
      id: number,
      socket: socket
    }
  }
]
*/
const rooms = [];

io.on("connection", (socket) => {
  let localId, remoteId, roomId;
  console.log("user connected");
  socket.on("self", (id) => {
    localId = id;
    console.log(`user ${localId} connected`);
  });
  socket.on("join", (id) => {
    remoteId = id;
    console.log(`${localId} wants to join ${remoteId}`);
    /* find room */
    const roomIndex = rooms.findIndex(
      room => 
        room.first.id === remoteId && 
        room.second.id === localId
    );
    if (roomIndex !== -1) {
      /* found room */
      const room = rooms[roomIndex];
      roomId = room.id;
      room.second.socket = socket;
      room.first.socket.emit("join", localId);
      socket.emit("joined");
    } else {
      /* new room */
      const room = {
        id: roomId = makeId(10),
        first: {
          id: localId,
          socket
        },
        second: {
          id: remoteId
        }
      };
      rooms.push(room);
      socket.emit("wait");
    }
  });
  socket.on("message", (msg) => {
    if (msg.trim()) {
      const room = rooms.find(
        room => room.id === roomId
      );
      if (room.first.id !== localId) 
        room.first.socket.emit("message", msg);
      if (room.second.id !== localId) 
        room.second.socket.emit("message", msg);
    }
  });
  socket.on("disconnect", () => {
    /* find room */
    const roomIndex = rooms.findIndex(
      room => room.id === roomId
    );
    if (roomIndex !== -1) {
      const room = rooms[roomIndex];
      /* remove room */
      rooms.splice(roomIndex, 1);
      /* disconnect peers */
      room.first.socket?.disconnect(true);
      room.second.socket?.disconnect(true);
    }
    console.log("user disconnected");
  });
});

module.exports = io;