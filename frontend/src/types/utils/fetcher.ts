type Method = "GET" | "POST";

export default interface Options {
  method: Method,
  headers?: HeadersInit;
  body?: any;
}