using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = "http://localhost:8080/realms/Float-realm"; // your keycloak address
                options.Audience = "float-client";
                options.RequireHttpsMetadata = false; // For testing, you might want to set this to true in production
            })
            .AddGoogle(options =>
            {
                options.ClientId = "12284746508-cmbj3ckdirdh5vrv57tb0av6flem7esp.apps.googleusercontent.com";
                options.ClientSecret = "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";
            });


builder.Services.AddAuthorization();
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(option =>
    {
        option.SwaggerEndpoint("/swagger/v1/swagger.json", "Float Auth API V1");
    });
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
