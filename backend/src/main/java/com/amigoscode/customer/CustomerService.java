package com.amigoscode.customer;

import com.amigoscode.exceptions.DuplicateResourceException;
import com.amigoscode.exceptions.RequestValidationException;
import com.amigoscode.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerDao customerDao;

    public CustomerService(@Qualifier("jdbc") CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    public List<Customer> getAllCustomers() {
        return customerDao.selectAllCustomers();
    }

    public Customer getCustomer(Integer id) {
        return customerDao.selectCustomerById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer with id [%s] not found".formatted(id)));
    }

    public void addCustomer(CustomerRegistrationRequest customerRegistrationRequest) {
        if (customerDao.existCustomerWithEmail(customerRegistrationRequest.email())) {
            throw new DuplicateResourceException("Email already taken");
        }
        Customer customer = new Customer(customerRegistrationRequest.name(), customerRegistrationRequest.email(), customerRegistrationRequest.age());
        customerDao.insertCustomer(customer);
    }

    public void deleteCustomerById(Integer customerId) {
        if (!customerDao.existCustomerWithId(customerId)) {
            throw new ResourceNotFoundException("Customer with id [%s] not found".formatted(customerId));
        }
        customerDao.deleteCustomerById(customerId);
    }

    public void updateCustomer(Integer customerId, CustomerUpdateRequest customerUpdateRequest) {
        Customer existingCustomer = getCustomer(customerId);

        boolean changed = false;

        if (customerUpdateRequest.name() != null && !customerUpdateRequest.name().equals(existingCustomer.getName())) {
            existingCustomer.setName(customerUpdateRequest.name());
            changed = true;
        }
        if (customerUpdateRequest.email() != null && !customerUpdateRequest.email().equals(existingCustomer.getEmail())) {
            if (customerDao.existCustomerWithEmail(customerUpdateRequest.email())) {
                throw new DuplicateResourceException("Email already taken");
            }
            existingCustomer.setName(customerUpdateRequest.name());
            changed = true;
        }
        if (customerUpdateRequest.age() != null && !customerUpdateRequest.age().equals(existingCustomer.getAge())) {
            existingCustomer.setAge(customerUpdateRequest.age());
            changed = true;
        }

        if (!changed) {
            throw new RequestValidationException("No data changes found");
        }
        customerDao.updateCustomer(existingCustomer);
    }
}