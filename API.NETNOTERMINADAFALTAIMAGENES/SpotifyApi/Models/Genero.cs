namespace SpotifyApi.Models
{
    public class Genero
    {
        public int GeneroId { get; set; }
        public required string Nombre { get; set; }
        public List<Artista> Artistas { get; set; } = new List<Artista>();
    }
}
