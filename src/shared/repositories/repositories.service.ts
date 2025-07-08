import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

@Injectable()
export class BaseRepositoriesService<T> {
  constructor(private readonly model: Model<T>) {}

  async create(dto: Partial<T>): Promise<T> {
    return await this.model.create(dto);
  }

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return await this.model.find(filter);
  }

  async findById(id: Types.ObjectId): Promise<T | null> {
    return await this.model.findById(id);
  }

  async updateQuery(
    id: Types.ObjectId,
    dto: UpdateQuery<T>,
  ): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: Types.ObjectId): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    return !!(await this.model.exists(filter));
  }
}
