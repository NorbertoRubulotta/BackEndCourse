import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import {ProductDto} from "../persistence/dto/productDto.js"
import { UpdateProductDto } from 'src/persistence/dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
      return this.productsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.productsService.findOne(id);
    }
  
    @Post()
    create(@Body() createProductDto: ProductDto) {
      return this.productsService.save(createProductDto);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
      return this.productsService.update(id, updateProductDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.productsService.remove(id);
    }
  }
  

