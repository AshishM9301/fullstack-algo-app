const { getMarketData } = require("../controllers");

const sockets = (socket) => {
  try {
    //   const marketDataController = new MarketDataController(socket);

    //   socket.on("send-market-data", marketDataController.sendData);
    socket.on("token", (token) => {
      let tkn = {};
      tkn.authorization = token;
      const data = getMarketData(tkn);

      socket.emit("data-from-server", data);
    });

    //   socket.on("disconnect", (socket) => {
    //     console.log("User left.");
    //   });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sockets;
