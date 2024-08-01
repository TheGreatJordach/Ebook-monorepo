import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'env.production',
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow<string>('POSTGRES_HOST'),
                url: configService.getOrThrow<string>('POSTGRES_URL'),
                directUrl: configService.getOrThrow<string>(
                    'POSTGRES_URL_NO_SSL'
                ),
                database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
                username: configService.getOrThrow<string>('POSTGRES_USER'),
                password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow<boolean>(
                    'POSTGRE_SYNCHRONIZE'
                ),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseProdModule {}
