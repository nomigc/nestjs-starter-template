import { SchemaFactory } from '@nestjs/mongoose';
/**
 * Creates a Mongoose schema from the given class.
 * @param {new () => T} modelClass - The class you want to create the schema from.
 * @returns {{
 *   schema: any;
 *   name: string;
 * }} An object with the document type, the schema, and the class name.
 */
export function createModelSchema<T>(modelClass: new () => T) {
  const schema = SchemaFactory.createForClass(modelClass);

  return {
    schema,
    name: modelClass.name,
  };
}
