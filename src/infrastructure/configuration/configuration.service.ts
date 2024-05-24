import { ConfigService } from '@nestjs/config';
import {
    DatabaseConfiguration,
    DATABASE_NAME,
    DATABASE_PORT,
} from './model/database-configuration';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    private _databaseConfig: DatabaseConfiguration;

    get databaseConfig(): DatabaseConfiguration {
        return this._databaseConfig;
    }

    private set databaseConfig(value: DatabaseConfiguration) {
        this._databaseConfig = value;
    }

    constructor(private nestConfigService: ConfigService) {
        this.setupEnvironment();
    }

    private setupEnvironment(): void {
        const databasePort = this.getVariableFromEnvFile(DATABASE_PORT);
        const databaseName = this.getVariableFromEnvFile(DATABASE_NAME);

        this._databaseConfig = {
            DATABASE_NAME: databaseName,
            DATABASE_PORT: databasePort,
        };
    }

    private getVariableFromEnvFile(key: string): string {
        const variable = this.nestConfigService.get<string>(key);
        if (!variable) {
            throw new Error('No database port could be found from env file.');
        }
        return variable;
    }
}
