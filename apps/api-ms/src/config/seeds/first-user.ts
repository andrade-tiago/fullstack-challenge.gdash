import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { UserRole } from 'src/users/user.model'
import { UsersService } from 'src/users/users.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const usersService = app.get(UsersService)

  try {
    await usersService.create({
      name: 'Admin',
      email: 'admin@email.com',
      password: 'Admin@1234',
      role: UserRole.Admin,
    })
    
    Logger.log('Admin created!')
  }
  catch (ex) {
    Logger.error((ex as Error).message)
  }
  finally {
    await app.close();
  }
}
bootstrap();
