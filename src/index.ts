import express from "express";

const app = express();
const port = 4000;

const server = app.listen(4000, serverStartMessage);

function serverStartMessage(): void {
  console.log(`Server started on port ${port}`);
}

async function closeServer(): Promise<Error | void> {
  return new Promise((resolve, reject) =>
    server.close((error) => {
      if (error) {
        reject(error);
      }
      resolve();
    })
  );
}

async function shutdown(signal: string) {
  console.log(`Received signal to terminate: ${signal}`);

  // ensure current requests is finished to user
  await closeServer();

  // disconnect and ensure current requests are delivered
  process.kill(process.pid, signal);
}

function shutdownOnEvents(...events: string[]): void {
  events.forEach((event) => process.on(event, shutdown));
}

shutdownOnEvents("SIGINT", "SIGTERM");
