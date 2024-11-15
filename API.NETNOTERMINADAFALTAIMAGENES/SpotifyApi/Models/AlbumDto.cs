namespace SpotifyApi.Models
{
    public class AlbumDto
    {
        public int AlbumId { get; set; }
        public required string Titulo { get; set; }
        public int ArtistaId { get; set; }
        public string? ImagenUrl { get; set; }
    }
}
