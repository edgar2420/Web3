using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SpotifyApi.Models
{
    public class Artista
    {
        public int ArtistaId { get; set; }
        public required string Nombre { get; set; }
        public Genero? Genero { get; set; }
        public int GeneroId { get; internal set; }
    }
}
