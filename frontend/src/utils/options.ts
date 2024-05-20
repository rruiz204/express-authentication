type Method = "GET" | "POST" | "DELETE";

const withoutBody = (method: Method): RequestInit => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
  }
};

const withBody = <Type> (method: Method, body: Type): RequestInit => {
  return {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
}

const Options = { withoutBody, withBody };
export default Options;