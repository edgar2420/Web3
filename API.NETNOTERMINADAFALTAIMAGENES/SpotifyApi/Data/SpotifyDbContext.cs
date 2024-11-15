using Microsoft.EntityFrameworkCore;
using SpotifyApi.Models;

namespace SpotifyApi.Data
{
    public class SpotifyDbContext : DbContext
    {
        public SpotifyDbContext(DbContextOptions<SpotifyDbContext> options) : base(options) { }

        // Agrega DbSet para cada modelo
        public DbSet<Album> Albums { get; set; } = default!;
        public DbSet<Artista> Artistas { get; set; } = default!;
        public DbSet<Cancion> Canciones { get; set; } = default!;
        public DbSet<Genero> Generos { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Artista>()
                .HasMany(a => a.Albums)
                .WithOne(al => al.Artista)
                .HasForeignKey(al => al.ArtistaId);
            
            modelBuilder.Entity<Genero>()
                .HasMany(g => g.Artistas)
                .WithOne(a => a.Genero)
                .HasForeignKey(a => a.GeneroId);

        }
    }
}
