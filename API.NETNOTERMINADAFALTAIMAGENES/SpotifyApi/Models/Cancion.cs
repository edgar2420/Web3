namespace SpotifyApi.Models
{
    public class Cancion
    {
        public int CancionId { get; set; }
        public string Titulo { get; set; }
        public Album Album { get; set; }
        public string Audiourl { get; internal set; }
    }
}
