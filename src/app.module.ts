import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { DatabaseService } from './infrastructure/database/database.service';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { UserService } from './user/user.service';

@Module({
    imports: [
        UserModule.register(new DatabaseService()),
        TaskModule.register(
            new DatabaseService(),
            new UserService(new DatabaseService()),
        ),
        AppRoutingModule,
        ConfigurationModule,
        DatabaseModule,
    ],
})
export class AppModule {}
