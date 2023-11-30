import { makeAutoObservable } from "mobx";
import { IModalMessageService } from "./IModalMessageService";
import { ModalMessage } from "~/models/response/ModalMessage";
import { DataModalMessage } from "~/models/response/DataModalMessage";

export class ModalMessageService implements IModalMessageService {
  /**
   * Class that holds all information regarding the ModalMessages and displaying ModalMessages to the user.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides ModalMessages to the client.
   * The ModalMessageService implements the IModalMessageService
   *
   */

  // @observable
  modalMessagesQueue: ModalMessage[] = [];

  // @computed
  get displayModalMessage(): ModalMessage {
    return this.modalMessagesQueue[0];
  }

  // @computed
  get showModalMessage(): boolean {
    return this.modalMessagesQueue.length > 0;
  }

  // @action.bound
  addModal(addToastMessage: ModalMessage | DataModalMessage) {
    let toastMessage = addToastMessage;
    if (!(toastMessage instanceof ModalMessage)) {
      toastMessage = new ModalMessage({
        id: toastMessage.id,
        title: toastMessage.title,
        inProgress: toastMessage.inProgress,
        message: toastMessage.message,
        status: toastMessage.status,
        buttons: toastMessage.buttons,
      });
    }
    this.modalMessagesQueue.push(toastMessage);
  }

  // @action.bound
  removeModal(modalMessageId: number | string) {
    this.modalMessagesQueue = this.modalMessagesQueue.filter(
      (modalMessage) => modalMessage.id !== modalMessageId,
    );
  }
}

export const modalMessageService = new ModalMessageService();
makeAutoObservable(modalMessageService, {}, { autoBind: true });
