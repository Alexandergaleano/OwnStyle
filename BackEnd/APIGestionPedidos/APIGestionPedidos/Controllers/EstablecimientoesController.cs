using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIGestionPedidos.Models.DAL;
using APIGestionPedidos.Models.Entities;

namespace APIGestionPedidos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstablecimientoesController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public EstablecimientoesController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Establecimientoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Establecimiento>>> GetEstablecimiento()
        {
            return await _context.Establecimiento.ToListAsync();
        }

        // GET: api/Establecimientoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Establecimiento>> GetEstablecimiento(int id)
        {
            var establecimiento = await _context.Establecimiento.FindAsync(id);

            if (establecimiento == null)
            {
                return NotFound();
            }

            return establecimiento;
        }

        // PUT: api/Establecimientoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstablecimiento(int id, Establecimiento establecimiento)
        {
            if (id != establecimiento.IdEstablecimiento)
            {
                return BadRequest();
            }

            _context.Entry(establecimiento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstablecimientoExists(id))
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

        // POST: api/Establecimientoes
        [HttpPost]
        public async Task<ActionResult<Establecimiento>> PostEstablecimiento(Establecimiento establecimiento)
        {
            _context.Establecimiento.Add(establecimiento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEstablecimiento", new { id = establecimiento.IdEstablecimiento }, establecimiento);
        }

        // DELETE: api/Establecimientoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Establecimiento>> DeleteEstablecimiento(int id)
        {
            var establecimiento = await _context.Establecimiento.FindAsync(id);
            if (establecimiento == null)
            {
                return NotFound();
            }

            _context.Establecimiento.Remove(establecimiento);
            await _context.SaveChangesAsync();

            return establecimiento;
        }

        private bool EstablecimientoExists(int id)
        {
            return _context.Establecimiento.Any(e => e.IdEstablecimiento == id);
        }
    }
}
