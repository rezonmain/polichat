class Parsable<T> {
  constructor(
    private parseFn: (rawPart: string) => T,
    private _rawPart: string
  ) {}

  parse() {
    return this.parseFn(this._rawPart);
  }

  get rawPart() {
    return this._rawPart;
  }
}

export { Parsable };
