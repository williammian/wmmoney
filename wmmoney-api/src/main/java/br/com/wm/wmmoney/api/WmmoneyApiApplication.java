package br.com.wm.wmmoney.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;

import br.com.wm.wmmoney.api.config.property.WmmoneyApiProperty;

@SpringBootApplication
@EnableConfigurationProperties(WmmoneyApiProperty.class)
public class WmmoneyApiApplication {
	
	private static ApplicationContext APPLICATION_CONTEXT;

	public static void main(String[] args) {
		APPLICATION_CONTEXT = SpringApplication.run(WmmoneyApiApplication.class, args); 
	}
	
	public static <T> T getBean(Class<T> type) {
		return APPLICATION_CONTEXT.getBean(type);
	}
	
//	Habilita CORS globalmente desde que nao usado OAuth2
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurerAdapter() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/*").allowedOrigins("http://localhost:8080");
//			}
//		};
//	}

}
