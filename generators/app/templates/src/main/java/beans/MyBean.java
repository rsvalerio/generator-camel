package com.rsvalerio.beans;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    @Value("${msg}")
    private String sayHi;

    public String answer () {
        return sayHi;
    }
}
