export * from './activityPub.service';
import { ActivityPubService } from './activityPub.service';
export * from './app.service';
import { AppService } from './app.service';
export * from './auth.service';
import { AuthService } from './auth.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [ActivityPubService, AppService, AuthService, DefaultService, UserService];
