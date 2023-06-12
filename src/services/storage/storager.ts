import { StoragePart } from '@prisma/client';
import SecrecyHeavenStorager from './secrecy-heaven/storager';
import AmazonStorager from './amazon/storager';

export default class Storager {
  static getFile(storagePart: StoragePart) {
    switch (storagePart.providerId) {
      case 'secrecy_heaven':
        new SecrecyHeavenStorager(storagePart).getFile();
        break;
      case 'amazon':
        new AmazonStorager(storagePart).getFile();
        break;
      default:
        break;
    }
  }
}
