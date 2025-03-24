import { WebSocketServer } from "ws";
import { IncomingMessage } from "http";

const handleWebSocketConnections = (wss: WebSocketServer) => {
  wss.on("connection", (ws, req: IncomingMessage) => {
    console.log("New WebSocket connection");

    // Handle incoming messages
    ws.on("message", (message: string) => {
      try {
        // Parse the received message as JSON
        const parsedMessage = JSON.parse(message);

        console.log("Received message:", parsedMessage);

        // Example of processing the message
        if (parsedMessage.type === "create_game") {
            const { userName } = parsedMessage;
          const response = {
            status: "success",
            message: `Move  accepted for player`
          };
          ws.send(JSON.stringify(response)); // Send JSON response back to the client
        }
      } catch (error) {
        console.error("Error parsing JSON message:", error);
        // Optionally send an error response if JSON parsing fails
        ws.send(JSON.stringify({ status: "error", message: "Invalid JSON" }));
      }
    });

    // Send a welcome message when a client connects
    ws.send(JSON.stringify({ status: "info", message: "Welcome to the game server!" }));
  });
};

export default handleWebSocketConnections;
