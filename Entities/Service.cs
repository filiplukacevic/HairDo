using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HairDo.Entities
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int LengthInMinutes { get; set; }
        public int Price { get; set; }
    }
}
