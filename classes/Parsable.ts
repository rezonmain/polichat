class Parsable<T> {
  constructor(
    private parseFn: (rawPart: string) => T,
    private _rawPart: string | null = null
  ) {}

  parse(rawPart: string) {
    this._rawPart = rawPart;
    return this.parseFn(rawPart);
  }

  get rawPart() {
    return this._rawPart;
  }
}

export { Parsable };
