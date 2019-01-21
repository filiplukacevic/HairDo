using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HairDo.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public int ServiceId { get; set; }
        public virtual Service Service { get; set; }

        public int HairdresserId { get; set; }
        public virtual Hairdresser Hairdresser { get; set; }

        public int CustomerId { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
