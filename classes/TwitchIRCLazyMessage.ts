import { Parsable } from "@/classes/Parsable";
import {
  parseCommandFromRawPart,
  parseParamsFromRawPart,
  parseRawParts,
  parseSourceFromRawPart,
  parseTagsFromRawPart,
} from "@/helpers/twitch.helpers";
import type {
  TwitchIRCCommand,
  TwitchIRCMessage,
  TwitchIRCMessageTags,
  TwitchIRCRawParts,
  TwitchIRCSource,
} from "@/types/twitch.types";

class TwitchIRCLazyMessage implements TwitchIRCMessage {
  private tgs: Parsable<TwitchIRCMessageTags> | TwitchIRCMessageTags;
  private src: Parsable<TwitchIRCSource> | TwitchIRCSource;
  private cmd: Parsable<TwitchIRCCommand> | TwitchIRCCommand;
  private pms: Parsable<string[]> | string[];
  private _parts: TwitchIRCRawParts;

  constructor(private _raw: string) {
    const p = parseRawParts(this.raw);
    this.tgs = new Parsable<TwitchIRCMessageTags>(parseTagsFromRawPart, p.tgs);
    this.src = new Parsable<TwitchIRCSource>(parseSourceFromRawPart, p.src);
    this.cmd = new Parsable<TwitchIRCCommand>(parseCommandFromRawPart, p.cmd);
    this.pms = new Parsable<string[]>(parseParamsFromRawPart, p.pms);
    this._parts = p;
  }

  get raw() {
    return this._raw;
  }

  get parts() {
    return this._parts;
  }

  get tags() {
    if (this.tgs instanceof Parsable) {
      this.tgs = this.tgs.parse();
      return this.tgs;
    }
    return this.tgs;
  }

  get source() {
    if (this.src instanceof Parsable) {
      this.src = this.src.parse();
      return this.src;
    }
    return this.src;
  }

  get command() {
    if (this.cmd instanceof Parsable) {
      this.cmd = this.cmd.parse();
      return this.cmd;
    }
    return this.cmd;
  }

  get params() {
    if (this.pms instanceof Parsable) {
      this.pms = this.pms.parse();
      return this.pms;
    }
    return this.pms;
  }
}

export { TwitchIRCLazyMessage };
