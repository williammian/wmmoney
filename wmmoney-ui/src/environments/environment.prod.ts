export const environment = {
  production: true,
  //apiUrl: 'https://wmmoney-api.herokuapp.com'
  apiUrl: 'http://localhost:8080',

  //tokenWhitelistedDomains: [ /wmmoney-api.herokuapp.com/ ],
  tokenWhitelistedDomains: [ /localhost:8080/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
