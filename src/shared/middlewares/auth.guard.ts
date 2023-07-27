import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Observable } from 'rxjs'

// Shared
import { API, EnvVariables } from 'shared/config/envs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService<EnvVariables>) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    if (!authorization) throw new UnauthorizedException('Unauthorized. Missing Tokens!')

    const [prefix, token] = authorization.split(' ')
    const apiEnv = this.configService.get<API>('API')
    if (prefix !== 'Basic' || token !== apiEnv.auth)
      throw new ForbiddenException("You're not allowed to access this resource")

    return true
  }
}
