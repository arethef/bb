import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggingModule } from './interceptor/logging.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AppController } from './app.controller';
import { PlacesModule } from './places/places.module';
import { AdmissionsModule } from './admissions/admissions.module';
import emailConfig from './config/emailConfig';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { ProductsModule } from './products/products.module';
import { MarketsModule } from './markets/markets.module';
import { AddressesModule } from './addresses/addresses.module';
import { LineupsModule } from './lineups/lineups.module';
import { TicketsModule } from './tickets/tickets.module';
import { OrdersModule } from './orders/orders.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { TargetsModule } from './targets/targets.module';
import { LinksModule } from './links/links.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      timezone: process.env.DB_TIMEZONE,
    }),
    LoggingModule,
    BrandsModule,
    CustomersModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PlacesModule,
    AdmissionsModule,
    ProductsModule,
    MarketsModule,
    AddressesModule,
    LineupsModule,
    TicketsModule,
    OrdersModule,
    BookmarksModule,
    TargetsModule,
    LinksModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
