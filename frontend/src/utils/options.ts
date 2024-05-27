import Tokens from "./tokens";

type Method = "GET" | "POST" | "DELETE";

class Options <Body> {
  private method: Method;
  private headers: Record<string, string>;
  private body: Body | undefined;

  constructor (method: Method, body?: Body) {
    this.method = method;
    this.headers = { "Content-Type": "application/json" };
    this.body = body
  }

  setToken(): this {
    this.headers["Authorization"] = Tokens.get() as string;
    return this;
  }

  getOptions(): RequestInit {
    return {
      method: this.method,
      headers: this.headers,
      body: this.body ? JSON.stringify(this.body) : undefined
    }
  }
}

export default Options;