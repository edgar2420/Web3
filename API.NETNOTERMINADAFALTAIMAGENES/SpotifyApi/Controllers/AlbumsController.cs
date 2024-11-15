using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpotifyApi.Data;
using SpotifyApi.Models;

namespace SpotifyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly SpotifyDbContext _context;

        public AlbumsController(SpotifyDbContext context)
        {
            _context = context;
        }

        // GET: api/Albums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums()
        {
            var albums = await _context.Albums
                .Include(a => a.Artista)
                .Select(a => new AlbumDto
                {
                    AlbumId = a.AlbumId,
                    Titulo = a.Titulo,
                    ArtistaId = a.Artista.ArtistaId,
                    ImagenUrl = a.ImagenUrl
                })
                .ToListAsync();

            return Ok(albums);
        }

        // GET: api/Albums/Artista/5
        [HttpGet("Artista/{artistaId}")]
        public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbumsByArtista(int artistaId)
        {
            var artista = await _context.Artistas.Include(a => a.Albums).FirstOrDefaultAsync(a => a.ArtistaId == artistaId);

            if (artista == null)
            {
                return NotFound(new { message = "Artista no encontrado." });
            }

            var albums = artista.Albums.Select(album => new AlbumDto
            {
                AlbumId = album.AlbumId,
                Titulo = album.Titulo,
                ImagenUrl = album.ImagenUrl,
                ArtistaId = album.ArtistaId
            }).ToList();

            return Ok(albums);
        }



        // GET: api/Albums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumDto>> GetAlbum(int id)
        {
            var album = await _context.Albums
                .Include(a => a.Artista)
                .Select(a => new AlbumDto
                {
                    AlbumId = a.AlbumId,
                    Titulo = a.Titulo,
                    ArtistaId = a.Artista.ArtistaId,
                   ImagenUrl = a.ImagenUrl
                })
                .FirstOrDefaultAsync(a => a.AlbumId == id);

            if (album == null)
            {
                return NotFound(new { message = "Álbum no encontrado." });
            }

            return Ok(album);
        }

        // POST: api/Albums
        [HttpPost]
        public async Task<ActionResult<Album>> PostAlbum(AlbumDto albumDto)
        {
            var artista = await _context.Artistas.FindAsync(albumDto.ArtistaId);
            if (artista == null)
            {
                return NotFound(new { message = "Artista no encontrado." });
            }

            var album = new Album
            {
                Titulo = albumDto.Titulo,
                Artista = artista
            };

            _context.Albums.Add(album);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlbum", new { id = album.AlbumId }, album);
        }

        // PUT: api/Albums/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum(int id, AlbumDto albumDto)
        {
            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                return NotFound(new { message = "Álbum no encontrado." });
            }

            album.Titulo = albumDto.Titulo;
            album.Artista = await _context.Artistas.FindAsync(albumDto.ArtistaId) ?? album.Artista;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumExists(id))
                {
                    return NotFound(new { message = "Error al actualizar: El álbum no existe." });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Albums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            var album = await _context.Albums.FindAsync(id);
            if (album == null)
            {
                return NotFound(new { message = "Álbum no encontrado." });
            }

            _context.Albums.Remove(album);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlbumExists(int id)
        {
            return _context.Albums.Any(e => e.AlbumId == id);
        }
    }

}
