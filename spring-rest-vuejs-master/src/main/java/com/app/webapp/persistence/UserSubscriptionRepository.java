package com.app.webapp.persistence;

import com.app.webapp.application.domain.entity.User;
import com.app.webapp.application.domain.entity.UserSubscription;
import com.app.webapp.application.domain.entity.UserSubscriptionId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserSubscriptionRepository
    extends JpaRepository<UserSubscription, UserSubscriptionId> {

  List<UserSubscription> findBySubscriber(User user);

  List<UserSubscription> findByChannel(User channel);

  UserSubscription findByChannelAndSubscriber(User channel, User subscriber);

}