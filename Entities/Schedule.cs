using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HairDo.Entities
{
    public class Schedule
    {
        public int Id { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int HairdresserId { get; set; }
        public Hairdresser Hairdresser { get; set; }
    }
}
