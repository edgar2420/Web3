namespace SpotifyApi.Models
{
    public class ArtistaDto
    {
        public int ArtistaId { get; set; }
        public required string Nombre { get; set; }

        public string? Url { get; set; }

        public int GeneroId { get; set; }

        public  string NombreGenero { get; set; }
    }
}
