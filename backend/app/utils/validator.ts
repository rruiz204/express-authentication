import vine from "@vinejs/vine";

const Validator = async <Output> (schema: any, body: Output): Promise<Output> => {
  const compile = vine.compile(schema);
  return await compile.validate(body);
};

export default Validator;