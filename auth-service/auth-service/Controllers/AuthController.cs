using auth_service.DTO;
using auth_service.Service;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace auth_service.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private readonly AuthService _authService;

        public AuthController(IHttpClientFactory httpClientFactory, IConfiguration configuration, AuthService authService)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
            _authService = authService;
        }

        [EnableCors]
        [HttpPost("user-login")]
        public async Task<IActionResult> UserLogin(LoginDto UserLogin)
        {
            var responseString = await _authService.UserLogin(UserLogin);
            return Ok(responseString);
        }

        [EnableCors]
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(string token)
        {

            var client = new HttpClient();

            var values = new Dictionary<string, string>
            {
                { "grant_type", _configuration.GetValue<string>("KeyCloak:grant_type_google") },
                { "subject_token",  token},
                { "client_id", _configuration.GetValue<string>("KeyCloak:client_id") },
                { "client_secret", _configuration.GetValue<string>("KeyCloak:client_secret") },
                { "subject_issuer", _configuration.GetValue < string >("KeyCloak:subject_issuer") },
            };

            var content = new FormUrlEncodedContent(values);

            var response = await client.PostAsync(_configuration.GetValue<string>("KeyCloak:Get_token"), content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Google login failed with status code: {response.StatusCode}");
            }

            var responseString = await response.Content.ReadAsStringAsync();

            return Ok(responseString);
        }

        [EnableCors]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerForm)
        {
            var loginDto = new LoginDto { Email = _configuration.GetValue<string>("KeyCloak:adminEmail"), Password = _configuration.GetValue<string>("KeyCloak:adminPass") };
            var adminResponse = await _authService.UserLogin(loginDto);

            var responseObject = JsonConvert.DeserializeObject<dynamic>(adminResponse.ToString());
            String token = responseObject.access_token;

            var ResponseString = await _authService.Register(registerForm, token);

            return Ok(ResponseString);
        }

        [EnableCors]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout(string RefreshToken)
        {
            var client = new HttpClient();

            var values = new Dictionary<string, string>
            {
                { "client_id", _configuration.GetValue<string>("KeyCloak:client_id") },
                { "refresh_token",  RefreshToken}
            };

            var content = new FormUrlEncodedContent(values);

            var response = await client.PostAsync(_configuration.GetValue<string>("KeyCloak:Logout"), content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Logout failed with status code: {response.StatusCode}");
            }

            var responseString = await response.Content.ReadAsStringAsync();

            return Ok(responseString);
        }

        [EnableCors]
        [HttpGet("user-info")]
        public async Task<IActionResult> GetUserInfo(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            return Ok(jwtSecurityToken);
        }
    }
}
