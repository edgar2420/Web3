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
    public class CancionsController : ControllerBase
    {
        private readonly SpotifyDbContext _context;

        public CancionsController(SpotifyDbContext context)
        {
            _context = context;
        }

        // GET: api/Cancions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CancionDto>>> GetCanciones()
        {
            var canciones = await _context.Canciones
                .Include(a => a.Album)
                .Select(a => new CancionDto
                {
                    CancionId = a.CancionId,
                    Titulo = a.Titulo,
                    AlbumId = a.Album.AlbumId,
                    Audiourl = $"{Request.Scheme}://{Request.Host}/canciones/" + a.CancionId + ".mp3",
                })
                .ToListAsync();
            return Ok(canciones);
        }

        // GET: api/Cancions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CancionDto>> GetCancion(int id)
        {
            var cancion = await _context.Canciones
                .Include(a => a.Album)
                .FirstOrDefaultAsync(a => a.CancionId == id);

            if (cancion == null)
            {
                return NotFound();
            }

            var cancionDto = new CancionDto
            {
                CancionId = cancion.CancionId,
                Titulo = cancion.Titulo,
                AlbumId = cancion.Album.AlbumId,
                Audiourl = $"{Request.Scheme}://{Request.Host}/canciones/" + cancion.CancionId + ".mp3",
            };
            return Ok(cancionDto);
        }

        // PUT: api/Cancions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCancion(int id, CancionDto cancionDto)
        {
            var cancion = await _context.Canciones.Include(a => a.Album).FirstOrDefaultAsync(a => a.CancionId == id);

            if (cancion == null)
            {
                return NotFound("Canción no encontrada.");
            }

            // Actualizar el título de la canción
            cancion.Titulo = cancionDto.Titulo;

            // Buscar el álbum por el ID proporcionado en el DTO
            var album = await _context.Albums.FindAsync(cancionDto.AlbumId);
            if (album == null)
            {
                return NotFound("Álbum no encontrado.");
            }
            cancion.Album = album;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CancionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cancions
        [HttpPost]
        public async Task<ActionResult<Cancion>> PostCancion(CancionDto cancionDto)
        {
            Album? album = _context.Albums.Find(cancionDto.AlbumId);
            if (album == null)
            {
                return NotFound("Album not found");
            }

            Cancion cancionDB = new Cancion
            {
                Titulo = cancionDto.Titulo,
                Album = album
            };

            _context.Canciones.Add(cancionDB);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCancion", new { id = cancionDB.CancionId }, cancionDB);
        }

        // DELETE: api/Cancions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCancion(int id)
        {
            var cancion = await _context.Canciones.FindAsync(id);
            if (cancion == null)
            {
                return NotFound();
            }

            _context.Canciones.Remove(cancion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Cancions/{id}/upload
        [HttpPost("{id}/upload")]
        public async Task<IActionResult> UploadFile(int id, IFormFile file)
        {
            // Verifica si la canción existe en la base de datos
            var cancion = await _context.Canciones.FindAsync(id);
            if (cancion == null)
            {
                return NotFound(new { message = "La canción no existe." });
            }

            // Validación del archivo
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No se ha cargado ningún archivo o el archivo está vacío." });
            }

            // Valida el tipo de archivo (opcional, solo permitir .mp3)
            var allowedExtensions = new[] { ".mp3" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest(new { message = "Solo se permiten archivos con extensión .mp3." });
            }

            try
            {
                // Define la carpeta donde se almacenarán los archivos de canciones
                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/imagenesandmusicas");

                // Crea la carpeta si no existe
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                // Define la ruta completa del archivo
                var filePath = Path.Combine(folderPath, $"{id}.mp3");

                // Guarda el archivo en el servidor
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Genera la URL de acceso al archivo
                var fileUrl = $"{Request.Scheme}://{Request.Host}/imagenesandmusicas/{id}.mp3";

                // Puedes actualizar la canción en la base de datos para incluir la URL (opcional)
                cancion.Audiourl = fileUrl;
                _context.Canciones.Update(cancion);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Archivo subido correctamente.", url = fileUrl });
            }
            catch (Exception ex)
            {
                // Manejo de errores inesperados
                return StatusCode(500, new { message = "Error al procesar el archivo.", error = ex.Message });
            }
        }

        private bool CancionExists(int id)
        {
            return _context.Canciones.Any(e => e.CancionId == id);
        }
    }
}
