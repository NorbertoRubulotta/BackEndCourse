import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsModel } from './schema/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductsModel }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
