using auth_service.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;

namespace auth_service.Controllers
{
    [Route("")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public AuthController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        [HttpPost("user-login")]
        public async Task<IActionResult> UserLogin(LoginDto UserLogin)
        {
            var client = new HttpClient();

            var values = new Dictionary<string, string>
            {
                { "grant_type", _configuration.GetValue<string>("KeyCloak:grant_type") },
                { "client_id", _configuration.GetValue<string>("KeyCloak:client_id") },
                { "client_secret", _configuration.GetValue<string>("KeyCloak:client_secret") },
                { "username", UserLogin.Email },
                { "password", UserLogin.Password }
            };

            var content = new FormUrlEncodedContent(values);

            var response = await client.PostAsync(_configuration.GetValue<string>("KeyCloak:Get_token"), content);

            var responseString = await response.Content.ReadAsStringAsync();

            return Ok(responseString);
        }

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

            var responseString = await response.Content.ReadAsStringAsync();

            return Ok(responseString);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerForm, string token)
        {
            var client = new HttpClient();

            // Use the provided token
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            var user = new
            {
                enabled = true,
                email = registerForm.email,
                emailVerified = true,
                firstName = registerForm.firstName,
                lastName = registerForm.lastName,
                credentials = new[]
                {
                    new
                    {
                        type = _configuration.GetValue<string>("KeyCloak:grant_type"),
                        value = registerForm.password,
                        temporary = false
                    }
                }
            };

            var json = JsonConvert.SerializeObject(user);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(_configuration.GetValue<string>("KeyCloak:Register"), content);

            var responseString = await response.Content.ReadAsStringAsync();

            return Ok(responseString);
        }

    }
}
