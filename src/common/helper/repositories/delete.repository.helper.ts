import { BaseRepositoriesService } from '@/shared/repositories/repositories.service';
import {
  CustomBadRequestException,
  CustomNotFoundException,
  isValidMongoId,
} from '@/utils';
import { Model, Types } from 'mongoose';

/**
 * To delete a document from db
 * @param {Types.ObjectId} id Id comes from frontend.
 * @param {string} MODEL Model name for dynamic messaging.
 * @param {string} modelName Mongoose model to query with.
 * @returns {object} Deleted document.
 */
export const deleteRepositoryHelper = async <T>(
  id: Types.ObjectId,
  MODEL: string,
  modelName: Model<T>,
): Promise<any> => {
  if (!isValidMongoId(id)) {
    throw new CustomBadRequestException('Id is not valid');
  }
  //* Create a new instance of BaseRepositoriesService
  const repo = new BaseRepositoriesService<T>(modelName);

  const deleteDocument = await repo.delete(id);
  if (!deleteDocument) {
    throw new CustomNotFoundException(`${MODEL} not found`);
  }

  return deleteDocument;
};
