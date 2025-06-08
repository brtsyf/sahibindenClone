import { io } from "../server";

io.use((socket, next) => {
  const accessToken = socket.handshake.auth.accessToken;
  console.log(accessToken);
});
