package com.rsvalerio.beans;

import org.apache.camel.Exchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

  @Value("${msg}")
  private String sayHi;

  public void answer (Exchange exchange) {
    exchange.getIn().setHeader("msg", sayHi);
  }
}
