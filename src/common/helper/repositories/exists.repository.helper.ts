import { BaseRepositoriesService } from '@/shared/repositories/repositories.service';
import { CustomConflictException } from '@/utils';
import { FilterQuery, Model, Types } from 'mongoose';

/**
 * To check if a value already exists in the database
 * @param {any} fieldValue The value to be checked
 * @param {string} fieldName The field in the database to match against
 * @param {Model<T>} modelName The Mongoose model to query
 * @param {string | Types.ObjectId} id If passed then current document will be excluded
 * @returns {void} Throws an error if the document exists
 */
export const existsRepositoryHelper = async <T>(
  fieldValue: any,
  fieldName: string,
  modelName: Model<T>,
  id?: string | Types.ObjectId,
): Promise<void> => {
  const repo = new BaseRepositoriesService<T>(modelName);

  const query: FilterQuery<T> = { [fieldName]: fieldValue } as FilterQuery<T>;
  if (id) {
    query['_id'] = { $ne: id };
  }

  const exists = await repo.exists(query);
  if (exists) {
    throw new CustomConflictException(`${fieldValue} already exists`);
  }
};
