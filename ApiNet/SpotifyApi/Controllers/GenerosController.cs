using System;
using System.Collections.Generic;
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
    public class GenerosController : ControllerBase
    {
        private readonly SpotifyDbContext _context;

        public GenerosController(SpotifyDbContext context)
        {
            _context = context;
        }

        // GET: api/Generos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GeneroDto>>> GetGeneros()
        {
            try
            {
                var generos = await _context.Generos
                    .Select(g => new GeneroDto
                    {
                        GeneroId = g.GeneroId,
                        Nombre = g.Nombre,
                    })
                    .ToListAsync();

                return Ok(generos);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error en GetGeneros: {ex.Message}");
                return StatusCode(500, "Ocurrió un error al obtener los géneros.");
            }
        }


        // GET: api/Generos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Genero>> GetGenero(int id)
        {
            var genero = await _context.Generos
                .Where(g => g.GeneroId == id)
                .Select(g => new GeneroDto
                {
                    GeneroId = g.GeneroId,
                    Nombre = g.Nombre,
                })
                .FirstOrDefaultAsync();
            if (genero == null)
            {
                return NotFound();
            }

            return Ok(genero);
        }

        // PUT: api/Generos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGenero(int id, Genero genero)
        {
            if (id != genero.GeneroId)
            {
                return BadRequest();
            }

            _context.Entry(genero).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GeneroExists(id))
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

        // POST: api/Generos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Genero>> PostGenero(Genero genero)
        {
            _context.Generos.Add(genero);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGenero", new { id = genero.GeneroId }, genero);
        }

        // DELETE: api/Generos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenero(int id)
        {
            var genero = await _context.Generos.FindAsync(id);
            if (genero == null)
            {
                return NotFound();
            }

            _context.Generos.Remove(genero);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GeneroExists(int id)
        {
            return _context.Generos.Any(e => e.GeneroId == id);
        }
    }
}
