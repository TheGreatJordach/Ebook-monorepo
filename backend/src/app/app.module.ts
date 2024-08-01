import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseDevModule } from './database-dev/database.dev.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DatabaseProdModule } from './database-prod/database.prod.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseDevModule,
        DatabaseProdModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
