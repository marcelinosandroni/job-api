import { app } from "./config/app";
import { environment } from "./config/environment";

const server = app.listen(environment.port, () =>
  console.log(
    `Application listering on ${environment.host}:${environment.port}`
  )
);

function close(signal: string): void {
  console.log(`Received signal to terminate application: ${signal}`);
  const killProcess = (error?: Error) => {
    if (error) {
      console.error(error);
    }
    console.log("Killing the app process");

    /** @TODO disconnect database before killing the process */
    console.log("Finishing database connection");
    process.kill(process.pid, signal);
  };
  console.log("Clossing api http open connections");
  server.close(killProcess);
}

["SIGINT", "SIGTERM"].forEach((signal) =>
  process.on(signal, () => close(signal))
);
