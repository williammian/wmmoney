package br.com.wm.wmmoney.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import br.com.wm.wmmoney.api.config.property.WmmoneyApiProperty;

@SpringBootApplication
@EnableConfigurationProperties(WmmoneyApiProperty.class)
public class WmmoneyApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WmmoneyApiApplication.class, args); 
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
