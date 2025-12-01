import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Env, loadAndValidateEnv } from './config/env'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [loadAndValidateEnv],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Env, true>) => {
        const database =
          configService.getOrThrow<Env['database']>('database')

        return {
          uri: database.url,
          onConnectionCreate: conection => {
            conection.on('connected', () => Logger.log('Connected to MongoDB'))
          }
        }
      },
      inject: [ConfigService]
    }),
    AuthModule,
    CommonModule,
    UsersModule,
  ],
})
export class AppModule {}
