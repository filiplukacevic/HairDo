using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HairDo.Entities
{
    public class Hairdresser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}
