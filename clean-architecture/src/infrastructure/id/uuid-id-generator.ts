import { IdGenerator } from '@application/common/id-generator'
import { v4 as uuidv4 } from 'uuid'

export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return uuidv4()
  }
}
