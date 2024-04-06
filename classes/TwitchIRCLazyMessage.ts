import { Parsable } from "@/classes/Parsable";
import {
  parseCommandFromRawPart,
  parseParamsFromRawPart,
  parseRawParts,
  parseSourceFromRawPart,
  parseTagsFromRawPart,
} from "@/helpers/twitch.helpers";
import {
  TwitchIRCCommand,
  TwitchIRCMessage,
  TwitchIRCMessageTags,
  TwitchIRCRawParts,
  TwitchIRCSource,
} from "@/types/twitch.types";

class TwitchIRCLazyMessage implements TwitchIRCMessage {
  private _tgs: Parsable<TwitchIRCMessageTags> | TwitchIRCMessageTags;
  private _src: Parsable<TwitchIRCSource> | TwitchIRCSource;
  private _cmd: Parsable<TwitchIRCCommand> | TwitchIRCCommand;
  private _pms: Parsable<string[]> | string[];

  constructor(private _raw: string) {
    const p = parseRawParts(this.raw);
    this._tgs = new Parsable<TwitchIRCMessageTags>(parseTagsFromRawPart, p.tgs);
    this._src = new Parsable<TwitchIRCSource>(parseSourceFromRawPart, p.src);
    this._cmd = new Parsable<TwitchIRCCommand>(parseCommandFromRawPart, p.cmd);
    this._pms = new Parsable<string[]>(parseParamsFromRawPart, p.pms);
  }

  get raw() {
    return this._raw;
  }

  get tags() {
    if (this._tgs instanceof Parsable) {
      this._tgs = this._tgs.parse();
      return this._tgs;
    }
    return this._tgs;
  }

  get source() {
    if (this._src instanceof Parsable) {
      this._src = this._src.parse();
      return this._src;
    }
    return this._src;
  }

  get command() {
    if (this._cmd instanceof Parsable) {
      this._cmd = this._cmd.parse();
      return this._cmd;
    }
    return this._cmd;
  }

  get params() {
    if (this._pms instanceof Parsable) {
      this._pms = this._pms.parse();
      return this._pms;
    }
    return this._pms;
  }
}

export { TwitchIRCLazyMessage };
