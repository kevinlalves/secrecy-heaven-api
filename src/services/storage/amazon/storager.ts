import { StoragePart } from '@prisma/client';

export default class AmazonStorager {
  private storagePart: StoragePart;

  constructor(storagePart: StoragePart) {
    this.storagePart = storagePart;
  }

  public getFile() {
    return this.storagePart;
  }
}
