import AddItemToOrderUseCase from '@application/add-item-to-order.usecase'
import CancelOrderUseCase from '@application/cancel-order.usecase'
import { ID_GENERATOR, IdGenerator } from '@application/common/id-generator'
import ConfirmOrderUseCase from '@application/confirm-order.usecase'
import CreateOrderUseCase from '@application/create-order.usecase'
import CreateProductUseCase from '@application/create-product.usecase'
import DeactivateProductUseCase from '@application/deactivate-product.usecase'
import { UpdateStockUseCase } from '@application/update-stock.usecase'
import OrderRepository, {
  ORDER_REPOSITORY,
} from '@domain/order/order.repository'
import ProductRepository, {
  PRODUCT_REPOSITORY,
} from '@domain/product/product.repository'
import { UuidIdGenerator } from '@infrastructure/id/uuid-id-generator'
import OrderItemOrmEntity from '@infrastructure/persistence/typeorm/order-item/order-item.orm-entity'
import OrderOrmEntity from '@infrastructure/persistence/typeorm/order/order.orm-entity'
import OrderRepositoryImpl from '@infrastructure/persistence/typeorm/order/order.repository-impl'
import ProductOrmEntity from '@infrastructure/persistence/typeorm/product/product.orm-entity'
import ProductRepositoryImpl from '@infrastructure/persistence/typeorm/product/product.repository-impl'
import { typeOrmConfig } from '@infrastructure/persistence/typeorm/typeorm.config'
import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderController } from '@presentation/controllers/order.controller'
import { ProductController } from '@presentation/controllers/product.controller'
import Joi from 'joi'

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
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryImpl,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductRepositoryModule {}

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity])],
  providers: [
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderRepositoryModule {}

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
  imports: [OrderRepositoryModule, ProductRepositoryModule, IdGeneratorModule],
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
      useFactory: (
        orderRepository: OrderRepository,
        productRepository: ProductRepository,
      ) => new ConfirmOrderUseCase(orderRepository, productRepository),
      inject: [ORDER_REPOSITORY, PRODUCT_REPOSITORY],
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
        autoLoadEntities: true,
        synchronize: config.get<boolean>('DB_SYNCHRONIZE'),
        logging: config.get<boolean>('DB_LOGGING'),
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
