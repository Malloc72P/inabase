import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';

@Injectable()
export class CursorService {
  encodeCursor<T>(c: T) {
    return Buffer.from(JSON.stringify(c)).toString('base64');
  }

  decodeCursor<T>(cursor?: string): T | undefined {
    if (!cursor) return;
    return JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
  }
}
