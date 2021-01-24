package com.app.webapp.application.service;

import com.app.webapp.application.domain.dto.EventType;
import com.app.webapp.application.domain.dto.ObjectType;
import com.app.webapp.application.domain.entity.Comment;
import com.app.webapp.application.domain.entity.User;
import com.app.webapp.application.domain.entity.Views;
import com.app.webapp.application.util.WsSender;
import com.app.webapp.persistence.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.function.BiConsumer;

@Service
public class CommentService {
  private final CommentRepository commentRepository;
  private final BiConsumer<EventType, Comment> wsSender;

  @Autowired
  public CommentService(CommentRepository commentRepository, WsSender wsSender) {
    this.commentRepository = commentRepository;
    this.wsSender = wsSender.getSender(ObjectType.COMMENT, Views.FullComment.class);
  }



  public Comment create(Comment comment, User user) {
    comment.setAuthor(user);
    Comment commentFromDb = commentRepository.save(comment);


    wsSender.accept(EventType.CREATE, commentFromDb);

    return commentFromDb;
  }
}
