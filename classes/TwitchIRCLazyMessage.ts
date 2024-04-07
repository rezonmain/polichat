import { nil } from "@rezonmain/utils-nil";
import { Parsable } from "@/classes/Parsable";
import {
  parseCommandFromRawPart,
  parseParamsFromRawPart,
  parseRawParts,
  parseSourceFromRawPart,
  parseTagsFromRawPart,
} from "@/helpers/twitch.helpers";
import type { TwitchIRCMessage, TwitchIRCRawParts } from "@/types/twitch.types";

type P<T extends keyof TwitchIRCMessage> = [
  Parsable<TwitchIRCMessage[T]> | TwitchIRCMessage[T],
  keyof TwitchIRCRawParts
];

class TwitchIRCLazyMessage implements TwitchIRCMessage {
  private tgs: P<"tags">;
  private src: P<"source">;
  private cmd: P<"command">;
  private pms: P<"parameters">;
  /**
   * Raw parsed parts of the message
   */
  private parts: TwitchIRCRawParts | null = null;

  constructor(readonly raw: string) {
    this.tgs = [new Parsable(parseTagsFromRawPart), "tgs"];
    this.src = [new Parsable(parseSourceFromRawPart), "src"];
    this.cmd = [new Parsable(parseCommandFromRawPart), "cmd"];
    this.pms = [new Parsable(parseParamsFromRawPart), "pms"];
  }

  private getProperty<T extends keyof TwitchIRCMessage>(property: P<T>) {
    if (nil(this.parts)) {
      this.parts = parseRawParts(this.raw);
    }
    const [parsableOrValue, partRef] = property;

    if (parsableOrValue instanceof Parsable) {
      property[0] = parsableOrValue.parse(this.parts[partRef]);
      return property[0];
    }
    return parsableOrValue;
  }

  get tags() {
    return this.getProperty(this.tgs);
  }

  get source() {
    return this.getProperty(this.src);
  }

  get command() {
    return this.getProperty(this.cmd);
  }

  get parameters() {
    return this.getProperty(this.pms);
  }
}

export { TwitchIRCLazyMessage };
