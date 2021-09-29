// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
import { HttpParameterCodec } from '@angular/common/http';

export class CustomEncoder implements HttpParameterCodec {
    /**
     * encodeKey
     */
    encodeKey(key: string): string {
      return encodeURIComponent(key);
    }

    /**
     * encodeValue
     */
    encodeValue(value: string): string {
      return encodeURIComponent(value);
    }

    /**
     * decodeKey
     */
    decodeKey(key: string): string {
      return decodeURIComponent(key);
    }

    /**
     * decodeValue
     */
    decodeValue(value: string): string {
      return decodeURIComponent(value);
    }
  }
