package <%= userProps.package %>.routes;

import org.apache.camel.LoggingLevel;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MyRouter extends RouteBuilder {

  @Override
  public void configure() {

    from("timer:trigger")
      .transform().simple("ref:myOtherBean")
      .log(LoggingLevel.INFO, "Msg1: ${body}")
      .to("bean:myBean")
      .log(LoggingLevel.INFO, "Msg2: ${header.msg}")
      .end();
  }

  @Bean
  String myOtherBean() {
    return "Hello Wolrd from myOtherBean!!!";
  }

}
