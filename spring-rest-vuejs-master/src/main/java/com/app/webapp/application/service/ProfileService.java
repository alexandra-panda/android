package com.app.webapp.application.service;

import com.app.webapp.application.domain.entity.User;
import com.app.webapp.application.domain.entity.UserSubscription;
import com.app.webapp.persistence.UserDetailsRepository;
import com.app.webapp.persistence.UserSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileService {
  private final UserDetailsRepository userDetailsRepository;
  private final UserSubscriptionRepository userSubscriptionRepository;

  @Autowired
  public ProfileService(UserDetailsRepository userDetailsRepository,
                        UserSubscriptionRepository userSubscriptionRepository) {
    this.userDetailsRepository = userDetailsRepository;
    this.userSubscriptionRepository = userSubscriptionRepository;
  }

  public User changeSubscription(User channel, User subscriber) {
    List<UserSubscription> subcriptions = channel.getSubscribers()
        .stream()
        .filter(subscription ->
            subscription.getSubscriber().equals(subscriber)
        )
        .collect(Collectors.toList());

    if (subcriptions.isEmpty()) {
      UserSubscription subscription = new UserSubscription(channel, subscriber);
      channel.getSubscribers().add(subscription);
    } else {
      channel.getSubscribers().removeAll(subcriptions);
    }

    User result = userDetailsRepository.save(channel);
    return result;
  }

  public List<UserSubscription> getSubscribers(User channel) {
    return userSubscriptionRepository.findByChannel(channel);
  }

  public UserSubscription changeSubscriptionStatus(User channel, User subscriber) {
    UserSubscription subscription = userSubscriptionRepository.findByChannelAndSubscriber(channel, subscriber);
    subscription.setActive(!subscription.isActive());

    return userSubscriptionRepository.save(subscription);
  }

}

