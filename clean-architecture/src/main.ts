import AddItemToOrderUseCase from '@application/add-item-to-order.usecase'
import CancelOrderUseCase from '@application/cancel-order.usecase'
import IdGenerator from '@application/common/id-generator'
import UnitOfWork from '@application/common/unit-of-work'
import ConfirmOrderUseCase from '@application/confirm-order.usecase'
import CreateOrderUseCase from '@application/create-order.usecase'
import CreateProductUseCase from '@application/create-product.usecase'
import DeactivateProductUseCase from '@application/deactivate-product.usecase'
import UpdateStockUseCase from '@application/update-stock.usecase'
import OrderRepository from '@domain/order/order.repository'
import ProductRepository from '@domain/product/product.repository'
import UuidIdGenerator, {
  ID_GENERATOR,
} from '@infrastructure/id/uuid-id-generator'
import OrderItemOrmEntity from '@infrastructure/persistence/typeorm/order-item/order-item.orm-entity'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import OrderRepositoryImpl, {
  ORDER_REPOSITORY,
} from '@infrastructure/persistence/typeorm/order/order.repository-impl'
import ProductOrmEntity from '@infrastructure/persistence/typeorm/product/product.orm-entity'
import ProductRepositoryImpl, {
  PRODUCT_REPOSITORY,
} from '@infrastructure/persistence/typeorm/product/product.repository-impl'
import {
  UNIT_OF_WORK,
  UnitOfWorkImpl,
} from '@infrastructure/persistence/typeorm/unit-of-work/unit-of-work.impl'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TypeOrmModule } from '@nestjs/typeorm'
import OrderController from '@web-api/controllers/order.controller'
import ProductController from '@web-api/controllers/product.controller'
import Joi from 'joi'
import { DataSource } from 'typeorm'

@Module({
  providers: [
    {
      provide: ID_GENERATOR,
      useClass: UuidIdGenerator,
    },
  ],
  exports: [ID_GENERATOR],
})
export class IdGeneratorModule {}

@Module({
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useFactory: (dataSource: DataSource) => {
        return new ProductRepositoryImpl(dataSource)
      },
      inject: [DataSource],
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductRepositoryModule {}

@Module({
  providers: [
    {
      provide: ORDER_REPOSITORY,
      useFactory: (dataSource: DataSource) => {
        return new OrderRepositoryImpl(dataSource)
      },
      inject: [DataSource],
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderRepositoryModule {}

@Module({
  providers: [
    {
      provide: UNIT_OF_WORK,
      useFactory: (dataSource: DataSource) => {
        return new UnitOfWorkImpl(dataSource)
      },
      inject: [DataSource],
    },
  ],
  exports: [UNIT_OF_WORK],
})
export class TransactionModule {}

@Module({
  imports: [ProductRepositoryModule, IdGeneratorModule],
  controllers: [ProductController],
  providers: [
    {
      provide: CreateProductUseCase,
      useFactory: (
        productRepository: ProductRepository,
        idGenerator: IdGenerator,
      ) => new CreateProductUseCase(productRepository, idGenerator),
      inject: [PRODUCT_REPOSITORY, ID_GENERATOR],
    },
    {
      provide: UpdateStockUseCase,
      useFactory: (productRepository: ProductRepository) =>
        new UpdateStockUseCase(productRepository),
      inject: [PRODUCT_REPOSITORY],
    },
    {
      provide: DeactivateProductUseCase,
      useFactory: (productRepository: ProductRepository) =>
        new DeactivateProductUseCase(productRepository),
      inject: [PRODUCT_REPOSITORY],
    },
  ],
})
export class ProductModule {}

@Module({
  imports: [
    OrderRepositoryModule,
    ProductRepositoryModule,
    TransactionModule,
    IdGeneratorModule,
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: CreateOrderUseCase,
      useFactory: (
        orderRepository: OrderRepository,
        idGenerator: IdGenerator,
      ) => new CreateOrderUseCase(orderRepository, idGenerator),
      inject: [ORDER_REPOSITORY, ID_GENERATOR],
    },
    {
      provide: AddItemToOrderUseCase,
      useFactory: (
        orderRepository: OrderRepository,
        productRepository: ProductRepository,
        idGenerator: IdGenerator,
      ) =>
        new AddItemToOrderUseCase(
          orderRepository,
          productRepository,
          idGenerator,
        ),
      inject: [ORDER_REPOSITORY, PRODUCT_REPOSITORY, ID_GENERATOR],
    },
    {
      provide: ConfirmOrderUseCase,
      useFactory: (unitOfWork: UnitOfWork) =>
        new ConfirmOrderUseCase(unitOfWork),
      inject: [UNIT_OF_WORK],
    },
    {
      provide: CancelOrderUseCase,
      useFactory: (orderRepository: OrderRepository) =>
        new CancelOrderUseCase(orderRepository),
      inject: [ORDER_REPOSITORY],
    },
  ],
})
export class OrderModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),

        DB_SYNCHRONIZE: Joi.boolean().default(false),
        DB_LOGGING: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
        logging: config.get<boolean>('DB_LOGGING'),

        entities: [OrderOrmEntity, OrderItemOrmEntity, ProductOrmEntity],
      }),
    }),
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('NestJS Examples - Clean Architecture')
    .setDescription('API con Clean Architecture y DDD - Productos y Ordenes')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const port = process.env.PORT || 3000
  await app.listen(port)
}

bootstrap()
