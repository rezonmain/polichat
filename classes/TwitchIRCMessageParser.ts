import { TwitchIRCMessage } from "@/types/twitch.types";
import { TwitchIRCLazyMessage } from "@/classes/TwitchIRCLazyMessage";
import { parseCompleteMessage } from "@/helpers/twitch.helpers";

class TwitchIRCMessageParser {
  constructor() {}

  /**
   * Completely parses the raw message
   */
  parse(raw: string): TwitchIRCMessage {
    return parseCompleteMessage(raw);
  }

  /**
   * Lazily parses the raw message.
   * Message components are only parsed when accessed
   */
  lazyParse(raw: string): TwitchIRCLazyMessage {
    return new TwitchIRCLazyMessage(raw);
  }
}

export { TwitchIRCMessageParser };
