using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HairDo.DTOs
{
    public class FreeAppointmentDto
    {
        public int HairdresserId { get; set; }
        public string HairdresserName { get; set; }
        public DateTime Date { get; set; }
        public int ServicePrice { get; set; }
        public string ServiceName { get; set; }
        public int ServiceLength { get; set; }
    }
}
