package com.app.webapp.persistence;


import com.app.webapp.application.domain.entity.Message;
import com.app.webapp.application.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long > {

  @EntityGraph(attributePaths = {"comments"})
//  Page<Message> findAll(Pageable pageable);
  Page<Message> findByAuthorIn(List<User> users, Pageable pageable);
}
