class Parsable<T> {
  constructor(
    private parseFn: (rawPart: string) => T,
    public rawPart: string | null = null
  ) {}

  parse(rawPart: string) {
    this.rawPart = rawPart;
    return this.parseFn(rawPart);
  }
}

export { Parsable };
