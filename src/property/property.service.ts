// property.service.ts
import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { dot } from 'node:test/reporters';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constans';

@Injectable()
export class PropertyService {

  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>
  ) { }


  async findAll(paginationDto: PaginationDTO) {
    const { skip = 0, limit = DEFAULT_PAGE_SIZE } = paginationDto;

    const [data, total] = await this.propertyRepo.findAndCount({
      skip,
      take: limit
    });

    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page: currentPage,
      totalPages,
      limit,
      skip,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      links: {
        next: currentPage < totalPages ? `?skip=${skip + limit}&limit=${limit}` : null,
        prev: currentPage > 1 ? `?skip=${skip - limit}&limit=${limit}` : null
      }
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
