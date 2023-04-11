import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductList } from './products.repository.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductList],
})
export class ProductsModule {}
