import { isValidObjectId, Types } from 'mongoose';

/**
 * Return true if given parameter is valid mongo id.
 * @param {Types.ObjectId} id id comes from client.
 * @returns {Boolean} true or false.
 */
export const isValidMongoId = (id: Types.ObjectId): boolean => {
  return isValidObjectId(id);
};

/**
 * Return true if given parameter is Array.
 * @param {Array} arr array to check.
 */
export const checkArray = (arr: any[]) => {
  Array.isArray(arr);
};
/**
 * To make username from name by removing special characters and spaces.
 * @param {string} name A string possibly containing special characters or spaces.
 * @returns {string} A string without special characters or spaces.
 */
export const makeUserName = (name: string) => {
  return name
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
};
