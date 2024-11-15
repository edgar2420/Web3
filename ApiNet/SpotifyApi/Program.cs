using Microsoft.EntityFrameworkCore;
using SpotifyApi.Data;
using Microsoft.Extensions.DependencyInjection;
using SpotifyApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<SpotifyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SpotifyDbContext") ?? throw new InvalidOperationException("Connection string 'SpotifyDbContext' not found.")));

// Configuración de CORS (para permitir que tu app React pueda acceder a la API)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")

              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
