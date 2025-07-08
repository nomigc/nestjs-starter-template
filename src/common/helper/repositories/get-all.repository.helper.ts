import { Model, FilterQuery } from 'mongoose';
import { CustomNotFoundException } from '@/utils';
import { BaseRepositoriesService } from '@/shared/repositories/repositories.service';

/**
 * Get all documents from DB with pagination, search, filter, and populate
 * @param {string} page Page number from query
 * @param {string} limit Limit from query
 * @param {string} MODEL Model name for dynamic messaging.
 * @param {Model} modelName Mongoose model to query with.
 * @param {string} [search=null] Search keyword
 * @param {string} [searchField=null] Field to apply search on default will be null.
 * @param {Array} [populate=[]] Populate array of objects containing path and select fields.
 * @param {object} [filters={}] Fields to filter documents default will be empty object.
 * @returns {Array & object} Array of documents and pagination data.
 */
export const getAllRepositoryHelper = async <T>(
  page: string,
  limit: string,
  MODEL: string,
  modelName: Model<any>,
  search: string | null = null,
  searchField: string | null = null,
  populate: Array<{ path: string; select?: string }> = [],
  filters: object = {},
) => {
  //* Create a new instance of BaseRepositoriesService
  const repo = new BaseRepositoriesService<T>(modelName);

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  if (search && searchField) {
    filters[searchField] = { $regex: search, $options: 'i' } as any;
  }

  let query = modelName
    .find(filters)
    .sort('-createdAt')
    .skip(skip)
    .limit(limitNumber)
    .lean();
  if (populate.length > 0) {
    query = query.populate(populate);
  }

  const [items, totalItems] = await Promise.all([
    query.exec(),
    modelName.countDocuments(filters).exec(),
  ]);

  if (items.length === 0) {
    throw new CustomNotFoundException(`${MODEL} not found`);
  }

  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    items,
    totalItems,
    totalPages,
    itemsPerPage: limitNumber,
    currentPage: pageNumber,
  };
};
