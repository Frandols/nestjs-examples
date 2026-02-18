import IdGenerator from '@application/common/id-generator'
import { v4 as uuidv4 } from 'uuid'

export default class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return uuidv4()
  }
}

export const ID_GENERATOR = Symbol('ID_GENERATOR')
