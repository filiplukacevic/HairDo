using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HairDo.Entities;
using HairDo.Persistence;

namespace HairDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HairdressersController : ControllerBase
    {
        private readonly HairDoDbContext _context;

        public HairdressersController(HairDoDbContext context)
        {
            _context = context;
        }

        // GET: api/Hairdressers
        [HttpGet]
        public IEnumerable<Hairdresser> GetHairdressers()
        {
            return _context.Hairdressers;
        }

        // GET: api/Hairdressers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHairdresser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hairdresser = await _context.Hairdressers.FindAsync(id);

            if (hairdresser == null)
            {
                return NotFound();
            }

            return Ok(hairdresser);
        }

        // PUT: api/Hairdressers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHairdresser([FromRoute] int id, [FromBody] Hairdresser hairdresser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hairdresser.Id)
            {
                return BadRequest();
            }

            _context.Entry(hairdresser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HairdresserExists(id))
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

        // POST: api/Hairdressers
        [HttpPost]
        public async Task<IActionResult> PostHairdresser([FromBody] Hairdresser hairdresser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Hairdressers.Add(hairdresser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHairdresser", new { id = hairdresser.Id }, hairdresser);
        }

        // DELETE: api/Hairdressers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHairdresser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hairdresser = await _context.Hairdressers.FindAsync(id);
            if (hairdresser == null)
            {
                return NotFound();
            }

            _context.Hairdressers.Remove(hairdresser);
            await _context.SaveChangesAsync();

            return Ok(hairdresser);
        }

        private bool HairdresserExists(int id)
        {
            return _context.Hairdressers.Any(e => e.Id == id);
        }
    }
}