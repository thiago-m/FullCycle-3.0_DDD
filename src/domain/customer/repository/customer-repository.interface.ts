import Customer from '../entity/customer'
import RepositoryInterface from '../../@shared/repository/repository-inteface'

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
