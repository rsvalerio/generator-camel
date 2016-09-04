package <%= userProps.package %>.routes;

import org.apache.camel.spring.boot.FatJarRouter;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppBootstrapRouter extends FatJarRouter {
}
