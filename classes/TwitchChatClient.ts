import { ranFixLenInt } from "@/helpers/utils.helpers";
import { TwitchIRCMessageParser } from "@/classes/TwitchIRCMessageParser";
import type { TwitchIRCMessage } from "@/types/twitch.types";

class TwitchChatClient {
  static SECURE_WEBSOCKET_URL = "wss://irc-ws.chat.twitch.tv:443";
  static WEBSOCKET_URL = "ws://irc-ws.chat.twitch.tv:80";
  static ANON_USERNAME_BASE = "justinfan";
  static ANON_PASSWORD = "SCHMOOPIIE";
  static CAPABILITIES = [
    "twitch.tv/tags",
    "twitch.tv/commands",
    "twitch.tv/membership",
  ];
  static getRandomAnonUsername() {
    return `${TwitchChatClient.ANON_USERNAME_BASE}${ranFixLenInt(8)}`;
  }

  constructor(
    private channelName: string,
    private wsc = new WebSocket(TwitchChatClient.SECURE_WEBSOCKET_URL),
    private parser = new TwitchIRCMessageParser(),
    private username = TwitchChatClient.getRandomAnonUsername(),
    private password = TwitchChatClient.ANON_PASSWORD,
    private capabilities = TwitchChatClient.CAPABILITIES
  ) {}

  connect() {
    this.registerSocketHandlers();
  }

  private registerSocketHandlers() {
    this.wsc.onopen = () => {
      this.authenticate();
    };

    this.wsc.onmessage = (event) => {
      this.handleMessage(event.data);
    };
  }

  private authenticate() {
    this.wsc.send(`CAP REQ :${this.capabilities.join(" ")}`);
    this.wsc.send(`PASS ${this.password}`);
    this.wsc.send(`NICK ${this.username}`);
  }

  private joinChannel() {
    this.wsc.send(`JOIN #${this.channelName}`);
  }

  private pong(m: TwitchIRCMessage) {
    this.wsc.send(`PONG ${m.parameters.params}`);
  }

  private handleMessage(raw: string) {
    const messages = raw.trim().split("\r\n");
    messages.forEach((message) => {
      const m = this.parser.lazyParse(message);

      switch (m.command.ident) {
        case "001":
          this.joinChannel();
          break;
        case "PING":
          this.pong(m);
          break;
        case "PRIVMSG":
          console.log(m.parameters.params);
          break;
      }
    });
  }
}

export { TwitchChatClient };
