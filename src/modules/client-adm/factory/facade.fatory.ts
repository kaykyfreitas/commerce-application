import ClientAdmFacade from "../facade/client-adm.facade";
import ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create(): ClientAdmFacadeInterface {
    const clientRpository = new ClientRepository();
    const addUseCase = new AddClientUseCase(clientRpository);
    const findUseCase = new FindClientUseCase(clientRpository);

    return new ClientAdmFacade({
      addUseCase: addUseCase,
      findUseCase: findUseCase
    })
  }
}