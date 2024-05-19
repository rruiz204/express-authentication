type Method = "GET" | "POST";

export default interface IOptions {
  method: Method,
  headers?: HeadersInit;
  body?: any;
}