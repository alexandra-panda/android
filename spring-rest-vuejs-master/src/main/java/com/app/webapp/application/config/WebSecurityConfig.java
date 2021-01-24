package com.app.webapp.application.config;


import com.app.webapp.application.domain.entity.User;
import com.app.webapp.persistence.UserDetailsRepository;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import java.time.LocalDateTime;

@Configuration
@EnableWebSecurity
@EnableOAuth2Sso
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {




  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .antMatcher("/**")
        .authorizeRequests()
        .mvcMatchers("/").permitAll()
        .antMatchers("/", "/login**", "/js/**", "/error**").permitAll()
        .anyRequest().authenticated()
//        .and().oauth2Login()
        .and().logout().logoutSuccessUrl("/").permitAll()
        .and()
        .csrf().disable();
  }

  @Bean
  public PrincipalExtractor principalExtractor(UserDetailsRepository userDetailsRepository) {
    return map -> {
      String id = (String) map.get("sub");

      User user = userDetailsRepository.findById(id).orElseGet(() -> {
        User newUser = new User();
        newUser.setId(id);
        newUser.setEmail((String) map.get("email"));
        newUser.setName((String) map.get("name"));
        newUser.setGender((String) map.get("gender"));
        newUser.setLocale((String) map.get("locale"));
        newUser.setUserpic((String) map.get("picture"));

        return newUser;
      });

      user.setLastVisit(LocalDateTime.now());

      return userDetailsRepository.save(user);
    };
  }


}
