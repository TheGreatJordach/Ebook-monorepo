import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.getOrThrow<string>('MYSQL_HOST'),
                port: configService.getOrThrow<number>('MYSQL_PORT'),
                database: configService.getOrThrow<string>('MYSQL_DATABASE'),
                username: configService.getOrThrow<string>('MYSQL_USERNAME'),
                password: configService.getOrThrow<string>(
                    'MYSQL_ROOT_PASSWORD'
                ),
                autoLoadEntities: true,
                synchronize:
                    configService.getOrThrow<boolean>('MYSQL_SYNCHRONIZE'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseDevModule {}
