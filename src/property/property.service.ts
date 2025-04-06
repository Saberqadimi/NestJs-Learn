// property.service.ts
import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { dot } from 'node:test/reporters';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {

  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>
  ) { }


  async findAll(page: number = 1, limit: number = 1) {
    const [data, total] = await this.propertyRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    return {
      data,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }


  async findOne(id: number, sort: boolean) {
    const property = await this.propertyRepo.findOne({
      where: {
        id,
      },
    });

    if (!property) throw new NotFoundException();

    return property;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    const property = await this.propertyRepo.findOneBy({ id });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }

    await this.propertyRepo.update({ id }, dto);

    return {
      message: `Property with ID ${id} updated successfully.`,
      updated: {
        ...property,
        ...dto,
      },
    };
  }

  async delete(id: number) {
    const property = await this.propertyRepo.findOneBy({ id });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }
    return await this.propertyRepo.delete(id);
  }
}
