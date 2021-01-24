package com.app.webapp.application.controller;

import com.app.webapp.application.domain.dto.MessagePageDto;
import com.app.webapp.application.domain.entity.User;
import com.app.webapp.application.domain.entity.Views;
import com.app.webapp.application.rest.MessageController;
import com.app.webapp.application.service.MessageService;
import com.app.webapp.persistence.UserDetailsRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;

@Controller
@RequestMapping("/")
public class MainController {

  private final MessageService messageService;
  private final UserDetailsRepository userDetailsRepository;
  private final ObjectWriter messageWriter;
  private final ObjectWriter profileWriter;



  @Autowired
  public MainController(
      MessageService messageService,
      UserDetailsRepository userDetailsRepository,
      ObjectMapper mapper) {

    this.messageService = messageService;
    this.userDetailsRepository = userDetailsRepository;

    ObjectMapper objectMapper = mapper
        .setConfig(mapper.getSerializationConfig());

    this.messageWriter = objectMapper
        .writerWithView(Views.FullMessage.class);
    this.profileWriter = objectMapper
        .writerWithView(Views.FullProfile.class);
  }



  @GetMapping
  public String main(
      Model model,
      @AuthenticationPrincipal User authorizedUser
  ) throws JsonProcessingException {


    HashMap<Object, Object> data = new HashMap<>();

    if(authorizedUser!=null){
      User userFromDb = userDetailsRepository.findById(authorizedUser.getId()).get();
      String serializedProfile = profileWriter.writeValueAsString(userFromDb);
      model.addAttribute("profile", serializedProfile);

      Sort sort = Sort.by(Sort.Direction.DESC, "id");
      PageRequest pageRequest = PageRequest.of(0, MessageController.MESSAGES_PER_PAGE, sort);
//      MessagePageDto messagePageDto = messageService.findAll(pageRequest);
      MessagePageDto messagePageDto = messageService.findForUser(pageRequest, authorizedUser);

      String messages = messageWriter.writeValueAsString(messagePageDto.getMessages());

      data.put("currentPage", messagePageDto.getCurrentPage());
      data.put("totalPages", messagePageDto.getTotalPages());

      model.addAttribute("messages", messages);
    }else{
      model.addAttribute("messages", "[]");
      model.addAttribute("profile", "null");

    }


    model.addAttribute("frontendData", data);

    return "index";
  }

}
