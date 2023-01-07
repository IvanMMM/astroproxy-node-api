export class ApiTokenMissing extends Error {
  constructor() {
    super();
    this.name = "ApiTokenMissing";
    this.message = "Missing API token";
  }
}

export class ApiTokenInvalid extends Error {
  constructor() {
    super();
    this.name = "ApiTokenInvalid";
    this.message = "API token should be 16 symbol string";
  }
}

export class FailedResponse extends Error {
  constructor(message) {
    super();
    this.name = "FailedResponse";
    this.message = `API returned an error: ${message}`;
  }
}
