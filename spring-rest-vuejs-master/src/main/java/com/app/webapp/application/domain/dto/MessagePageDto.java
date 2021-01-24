package com.app.webapp.application.domain.dto;

import com.app.webapp.application.domain.entity.Message;
import com.app.webapp.application.domain.entity.Views;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@JsonView(Views.FullMessage.class)
public class MessagePageDto {

  private List<Message> messages;
  private int currentPage;
  private int totalPages;


}
