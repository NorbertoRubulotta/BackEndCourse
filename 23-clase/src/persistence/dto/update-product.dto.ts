import { PartialType } from '@nestjs/mapped-types';
import { ProductDto } from './ProductDto.js';

export class UpdateProductDto extends PartialType(ProductDto) {}