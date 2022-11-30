import { HttpStatusCode, IHttpPostClient } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models/account-model";
import { AddAccountParams, AuthenticationParams, IAddAccount } from "@/domain/usecases";

export class RemoteAddAccount implements IAddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
        
      default:
        throw new UnexpectedError()
    }
   
  }

}