package com.rsvalerio.routes;

import org.apache.camel.spring.boot.FatJarRouter;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MyRouter extends FatJarRouter {

    @Override
    public void configure() {

        from("timer:trigger")
                .transform(method("MyBean", "answer"))
                .to("log:out");
    }

    @Bean
    String myOtherBean() {
        return "Hello Wolrd !!!";
    }

}
