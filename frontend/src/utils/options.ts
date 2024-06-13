type Method = "GET" | "POST" | "PUT" | "DELETE"

class Options {
  private method: Method = "GET";
  private headers: Record<string, string>;
  private body: any;

  constructor(headers?: Record<string, string>) {
    this.headers = { "Content-Type": "application/json", ...headers };
  }

  setMethod(method: Method): this {
    this.method = method;
    return this;
  }

  setBody(body: any): this {
    this.body = JSON.stringify(body);
    return this;
  }

  getOptions(): RequestInit {
    return {
      method: this.method,
      headers: this.headers,
      body: this.body,
    };
  }
}

export default Options;