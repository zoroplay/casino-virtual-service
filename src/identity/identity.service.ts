import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IDENTITY_SERVICE_NAME, IdentityServiceClient, SessionRequest, XpressLoginRequest, protobufPackage } from 'src/proto/identity.pb';

@Injectable()
export class IdentityService {
    private svc: IdentityServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
      }

    xpressLogin(data: XpressLoginRequest) {
        return firstValueFrom(this.svc.xpressGameLogin(data));
    }

    xpressLogout(data: SessionRequest) {
        return firstValueFrom(this.svc.xpressGameLogout(data));
    }

    validateXpressSession(data: SessionRequest) {
        return firstValueFrom(this.svc.validateXpressSession(data));
    }
  
}
