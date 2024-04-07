enum TwitchIRCCommand {
  REQ = "REQ",
  ACK = "ACK",
  CAP = "CAP",
  N001 = "001",
  N002 = "002",
  N003 = "003",
  N004 = "004",
  N353 = "353",
  N366 = "366",
  N372 = "372",
  N375 = "375",
  N376 = "376",
  JOIN = "JOIN",
  PART = "PART",
  PING = "PING",
  PONG = "PONG",
  PASS = "PASS",
  NICK = "NICK",
  NOTICE = "NOTICE",
  PRIVMSG = "PRIVMSG",
  RECONECT = "RECONECT",
  CLEARCHAT = "CLEARCHAT",
  USERSTATE = "USERSTATE",
  ROOMSTATE = "ROOMSTATE",
  HOSTTARGET = "HOSTTARGET",
  GLOBALUSERSTATE = "GLOBALUSERSTATE",
}

export { TwitchIRCCommand };
