using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HairDo.Entities;
using HairDo.Persistence;
using HairDo.DTOs;
using System.Collections.ObjectModel;

namespace HairDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : Controller
    {
        private readonly HairDoDbContext _context;

        public AppointmentsController(HairDoDbContext context)
        {
            _context = context;
        }

        // GET: api/Appointments
        [HttpGet]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments;
            return Ok(_context.Appointments);
        }

        [HttpPost("date")]
        public async Task<IActionResult> GetAppointmentsByDate([FromBody] DateTime date)
        {
            var appointments =
                await _context.Appointments
                    .Where(
                        a => a.Date.Year == date.Year
                            && a.Date.Month == date.Month
                            && a.Date.Day == date.Day
                    ).ToListAsync();

            ICollection<FreeAppointmentDto> dtos = new Collection<FreeAppointmentDto>();

            foreach(var appointment in appointments)
            {
                dtos.Add(new FreeAppointmentDto
                {
                    HairdresserId = appointment.Hairdresser.Id,
                    HairdresserName = appointment.Hairdresser.Name,
                    Date = appointment.Date,
                    ServicePrice = appointment.Service.Price,
                    ServiceName = appointment.Service.Name,
                    ServiceLength = appointment.Service.LengthInMinutes
                });
            }

            return Ok(dtos);
        }

        // GET: api/Appointments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }

        // PUT: api/Appointments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment([FromRoute] int id, [FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appointment.Id)
            {
                return BadRequest();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
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

        // POST: api/Appointments
        [HttpPost]
        public async Task<IActionResult> PostAppointment([FromBody] Appointment appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.Id }, appointment);
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return Ok(appointment);
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(e => e.Id == id);
        }
    }
}