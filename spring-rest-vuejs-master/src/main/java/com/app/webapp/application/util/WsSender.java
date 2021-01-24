package com.app.webapp.application.util;

import com.app.webapp.application.domain.dto.EventType;
import com.app.webapp.application.domain.dto.ObjectType;
import com.app.webapp.application.domain.dto.WsEventDto;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.function.BiConsumer;


@Component
public class WsSender {
  private final SimpMessagingTemplate template;
  private final ObjectMapper mapper;

  @Autowired
  public WsSender(SimpMessagingTemplate template, ObjectMapper mapper) {
    this.template = template;
    this.mapper = mapper;
  }

  public <T> BiConsumer<EventType, T> getSender(ObjectType objectType, Class view) {
    ObjectWriter writer = mapper
        .setConfig(mapper.getSerializationConfig())
        .writerWithView(view);

    return (EventType eventType, T payload) -> {
      String value = null;

      try {
        value = writer.writeValueAsString(payload);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }

      template.convertAndSend(
          "/topic/activity",
          new WsEventDto(objectType, eventType, value)
      );
    };
  }
}
