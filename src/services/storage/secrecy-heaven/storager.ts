import { StoragePart } from '@prisma/client';

export default class SecrecyHeavenStorager {
  private storagePart: StoragePart;

  constructor(storagePart: StoragePart) {
    this.storagePart = storagePart;
  }

  public getFile() {
    return this.storagePart;
  }
}
