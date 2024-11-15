namespace SpotifyApi.Models
{
    public class Album
    {
        public int AlbumId { get; set; }
        public string Titulo { get; set; }
        public string? ImagenUrl { get; set; }
        public Artista? Artista { get; set; }
    }
}
