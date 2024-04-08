class Logger {
  log(message: string) {
    console.log(
      `%c LOGGER ${new Date().toUTCString()} > ${message}`,
      "color: #E0E722;"
    );
  }
}

export { Logger };
