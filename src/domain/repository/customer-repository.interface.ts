import Customer from '../entity/customer'
import RepositoryInterface from './repository-inteface'

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
