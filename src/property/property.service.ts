// property.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  findAll() {
    return "Hello, I'm Saber Qadimi";
  }

  findOne(id: number, sort: boolean) {
    return {
      message: `You requested property with ID = ${id}`,
      sort,
    };
  }

  create(data: any) {
    return {
      message: 'Property created!',
      data,
    };
  }

  update(id: number, data: any) {
    return {
      message: `Property with ID = ${id} updated!`,
      data,
    };
  }
}
