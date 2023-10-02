package com.amigoscode;

import org.junit.jupiter.api.Test;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
class TestContainerTest extends AbstractTestSetup {

    @Test
    void canStartPostgresDb() {
        assertThat(postgreSqlContainer.isRunning()).isTrue();
        assertThat(postgreSqlContainer.isCreated()).isTrue();
    }

}
