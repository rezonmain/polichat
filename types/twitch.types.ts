type TwitchIRCMessage = {
  /**
   * The raw message string
   */
  raw: string;

  /**
   * The tags of the message.
   * Tags are key-value pairs that provide additional context to the message
   * see tags reference: https://dev.twitch.tv/docs/irc/tags
   */
  tags: TwitchIRCMessageTags | null;

  /**
   * The source of the message
   */
  source: TwitchIRCSource | null;

  /**
   * The command of the message
   */
  command: TwitchIRCCommand;

  /**
   * The parameters of the command
   */
  parameters: TwitchIRCParams;
};

type TwitchIRCRawParts = {
  tgs: string;
  src: string;
  cmd: string;
  pms: string;
};

type TwitchIRCMessageTags = {
  [key: string]: any;
};

type TwitchIRCSource = {
  nick: string | null;
  host: string;
};

type TwitchIRCCommand = {
  /**
   * The command identifier.
   * Ex: JOIN, PART, PRIVMSG, etc.
   */
  ident: string;

  /**
   * The channel the command is targeting.
   * Only present for channel-specific commands.
   * Always starts with a #
   * Ex: `#petsgomoo`
   */
  channel?: string;
  [key: string]: any;
};

type TwitchIRCParams = {
  botCommand?: string;
  params: string;
};

export type {
  TwitchIRCRawParts,
  TwitchIRCMessage,
  TwitchIRCMessageTags,
  TwitchIRCSource,
  TwitchIRCCommand,
  TwitchIRCParams,
};
