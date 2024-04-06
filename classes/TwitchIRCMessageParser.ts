import { TwitchIRCMessage } from "@/types/twitch.types";
import { TwitchIRCLazyMessage } from "@/classes/TwitchIRCLazyMessage";
import { parseCompleteMessage } from "@/helpers/twitch.helpers";

class TwitchIRCMessageParser {
  constructor(private raw: string) {}

  /**
   * Completely parses the raw message
   */
  parse(): TwitchIRCMessage {
    return parseCompleteMessage(this.raw);
  }

  /**
   * Lazily parses the raw message.
   * Message components are only parsed when accessed
   */
  lazyParse(): TwitchIRCLazyMessage {
    return new TwitchIRCLazyMessage(this.raw);
  }
}

export { TwitchIRCMessageParser };
