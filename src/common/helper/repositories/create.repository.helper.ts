import { BaseRepositoriesService } from '@/shared/repositories/repositories.service';
import { CustomBadRequestException } from '@/utils';
import { Model } from 'mongoose';

/**
 * To create a new document in the database
 * @param {Partial<T>} dto Data Transfer Object to create the document.
 * @param {string} MODEL Model name for dynamic messaging.
 * @param {Model<T>} modelName Mongoose model to query with.
 * @returns {object} Created document.
 */
export const createRepositoryHelper = async <T>(
  dto: any,
  MODEL: string,
  modelName: Model<T>,
): Promise<T> => {
  if (!dto || Object.keys(dto).length === 0) {
    throw new CustomBadRequestException(`No data provided to create ${MODEL}`);
  }

  //* Create a new instance of BaseRepositoriesService
  const repo = new BaseRepositoriesService<T>(modelName);

  const createdDocument = await repo.create(dto);
  if (!createdDocument) {
    throw new CustomBadRequestException(`Failed to create ${MODEL}`);
  }
  return createdDocument;
};
