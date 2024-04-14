using auth_service.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Text;

namespace auth_service.Service
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<String> UserLogin(LoginDto UserLogin)
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

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Login failed with status code: {response.StatusCode}");
            }

            var responseString = await response.Content.ReadAsStringAsync();

            return responseString;
        }

        public async Task<String> Register(RegisterDto registerForm, string token)
        {
            // register
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

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Registration failed with status code: {response.StatusCode}");
            }

            var responseString = await response.Content.ReadAsStringAsync();

            return responseString;
        }
    }
}
