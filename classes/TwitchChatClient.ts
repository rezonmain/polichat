import { ranFixLenInt } from "@/helpers/utils.helpers";
import { TwitchIRCMessageParser } from "@/classes/TwitchIRCMessageParser";

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

  private username: string;

  constructor(
    private channelName: string,
    private wsc = new WebSocket(TwitchChatClient.SECURE_WEBSOCKET_URL),
    private parser = new TwitchIRCMessageParser()
  ) {
    this.username = TwitchChatClient.getRandomAnonUsername();
    this.registerSocketHandlers();
  }

  private registerSocketHandlers() {
    this.wsc.onopen = () => {
      this.authenticate();
      // this.join();
    };

    this.wsc.onmessage = (event) => {
      this.handleMessage(event.data);
    };
  }

  private authenticate() {
    this.wsc.send(`CAP REQ :${TwitchChatClient.CAPABILITIES.join(" ")}`);
    this.wsc.send(`PASS ${TwitchChatClient.ANON_PASSWORD}`);
    this.wsc.send(`NICK ${this.username}`);
  }

  private join() {
    this.wsc.send(`JOIN #${this.channelName}`);
  }

  private handleMessage(raw: string) {
    const message = this.parser.lazyParse(raw);
    console.log(message);
  }

  static getRandomAnonUsername() {
    return `${TwitchChatClient.ANON_USERNAME_BASE}${ranFixLenInt(8)}`;
  }
}

export { TwitchChatClient };
