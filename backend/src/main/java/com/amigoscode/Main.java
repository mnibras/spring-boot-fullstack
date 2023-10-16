package com.amigoscode;

import com.amigoscode.customer.Customer;
import com.amigoscode.customer.CustomerRepository;
import com.amigoscode.customer.Gender;
import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Random;

@SpringBootApplication
public class Main {

    private static final Random random = new Random();
    public static final Faker faker = new Faker();

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {
        return args -> {
            Name nameObj = faker.name();
            String firstName = nameObj.firstName();
            String lastName = nameObj.lastName();
            String name = String.format("%s %s", firstName, lastName);
            String email = String.format("%s.%s@amigoscode.com", firstName, lastName);
            int age = random.nextInt(16, 99);
            Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
            Customer customer = new Customer(name, email, age, gender);
            customerRepository.save(customer);
        };
    }

}
