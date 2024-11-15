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
    public class ArtistasController : ControllerBase
    {
        private readonly SpotifyDbContext _context;

        public ArtistasController(SpotifyDbContext context)
        {
            _context = context;
        }

        // GET: api/Artistas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArtistaDto>>> GetArtista()
        {
            try
            {
                var artistas = await _context.Artistas
                    .Include(a => a.Genero)
                    .Select(a => new ArtistaDto
                    {
                        ArtistaId = a.ArtistaId,
                        Nombre = a.Nombre,
                        GeneroId = a.Genero != null ? a.Genero.GeneroId : 0,
                        NombreGenero = a.Genero != null ? a.Genero.Nombre : "N/A",
                        Url = $"{Request.Scheme}://{Request.Host}/artistas/{a.ArtistaId}.jpg"
                    })
                    .ToListAsync();

                Console.WriteLine("Número de artistas obtenidos: " + artistas.Count);
                return Ok(artistas);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error al obtener artistas: " + ex.Message);
                return StatusCode(500, "Error al obtener artistas.");
            }
        }


        // GET: api/Artistas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistaDto>> GetArtista(int id)
        {
            var artista = await _context.Artistas
                .Include(a => a.Genero)
                .FirstOrDefaultAsync(a => a.ArtistaId == id);

            if (artista == null)
            {
                return NotFound();
            }

            var artistaDto = new ArtistaDto
            {
                ArtistaId = artista.ArtistaId,
                Nombre = artista.Nombre,
                GeneroId = artista.Genero?.GeneroId ?? 0,
                NombreGenero = artista.Genero?.Nombre ?? "N/A",
                Url = $"{Request.Scheme}://{Request.Host}/artistas/{artista.ArtistaId}.jpg"
            };

            return Ok(artistaDto);
        }

        // PUT: api/Artistas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // PUT: api/Artistas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtista(int id, ArtistaDto artistadto)
        {
            var artista = await _context.Artistas.Include(a => a.Genero).FirstOrDefaultAsync(a => a.ArtistaId == id);

            if (artista == null)
            {
                return NotFound();
            }

            // Actualizamos solo el nombre y el género del artista
            artista.Nombre = artistadto.Nombre;

            var genero = await _context.Generos.FindAsync(artistadto.GeneroId);
            if (genero == null)
            {
                return NotFound("Genero not found");
            }
            artista.Genero = genero;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistaExists(id))
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


        // POST: api/Artistas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Artista>> PostArtista(ArtistaDto artistadto)
        {
            try
            {
                // Buscar el género en la base de datos
                Genero? genero = await _context.Generos.FindAsync(artistadto.GeneroId);
                if (genero == null)
                {
                    return NotFound("Genero not found");
                }

                // Crear el artista con el GeneroId directamente
                Artista artistaDB = new Artista
                {
                    Nombre = artistadto.Nombre,
                    GeneroId = artistadto.GeneroId, 
                    Genero = genero 
                };

                _context.Artistas.Add(artistaDB);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetArtista", new { id = artistaDB.ArtistaId }, artistaDB);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error al crear artista: " + ex.Message);
                return StatusCode(500, "Error al crear el artista.");
            }
        }


        // DELETE: api/Artistas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtista(int id)
        {
            var artista = await _context.Artistas.FindAsync(id);
            if (artista == null)
            {
                return NotFound();
            }

            _context.Artistas.Remove(artista);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPost("{id}/profile")]
        public async Task<IActionResult> UploadFile(int id, IFormFile file)
        {
            var artista = await _context.Artistas.FindAsync(id);
            if (artista == null)
            {
                return NotFound();
            }
            if (file == null || file.Length == 0)
                return BadRequest("No se ha cargado ningún archivo.");

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/artistas");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, id.ToString() + ".jpg");

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Asegúrate de devolver la URL en un objeto JSON válido
            var url = $"{Request.Scheme}://{Request.Host}/artistas/" + id.ToString() + ".jpg";
            return Ok(new { url });
        }


        // GET: api/Artistas/Genero/5
        [HttpGet("Genero/{generoId}")]
        public async Task<ActionResult<IEnumerable<ArtistaDto>>> GetArtistasByGenero(int generoId)
        {
            try
            {
                
                var artistas = await _context.Artistas
                    .Where(a => a.Genero != null && a.Genero.GeneroId == generoId) 
                    .Include(a => a.Genero) 
                    .Select(a => new ArtistaDto
                    {
                        ArtistaId = a.ArtistaId,
                        Nombre = a.Nombre,
                        GeneroId = a.Genero.GeneroId,
                        NombreGenero = a.Genero.Nombre, 
                        Url = $"{Request.Scheme}://{Request.Host}/artistas/{a.ArtistaId}.jpg"
                    })
                    .ToListAsync();

                
                if (artistas == null || !artistas.Any())
                {
                    return NotFound($"No se encontraron artistas para el género con ID {generoId}.");
                }

                return Ok(artistas);
            }
            catch (Exception ex)
            {
                
                Console.Error.WriteLine("Error al obtener artistas por género: " + ex.Message);
                return StatusCode(500, "Error al obtener artistas por género.");
            }
        }



        private bool ArtistaExists(int id)
        {
            return _context.Artistas.Any(e => e.ArtistaId == id);
        }
    }
}
