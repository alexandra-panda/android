package com.app.webapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@ActiveProfiles(profiles = "test")
@TestPropertySource("/application-test.yml")
class WebApplicationTests {

	@Test
	void contextLoads() {
	}

}
