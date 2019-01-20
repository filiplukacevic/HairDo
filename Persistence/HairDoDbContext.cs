using HairDo.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HairDo.Persistence
{
    public class HairDoDbContext : DbContext
    {
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Hairdresser> Hairdressers { get; set; }
        public DbSet<Service> Services { get; set; }

        public HairDoDbContext(DbContextOptions<HairDoDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hairdresser>().HasData(
                new Hairdresser { Id = 1, Name = "Anita" },
                new Hairdresser { Id = 2, Name = "Ticbra" }
            );

            modelBuilder.Entity<Schedule>().HasData(
                new Schedule
                {
                    Id = 1,
                    StartTime = new string("8:00"),
                    EndTime = new string("14:00"),
                    HairdresserId = 1
                }
            );

            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    Id = 1,
                    Name = "Chevan",
                    PhoneNumber = "09095434",
                    Email = "filip.lukacevic@gmail.com"
                },
                new Customer
                {
                    Id = 2,
                    Name = "Mala",
                    PhoneNumber = "09095434",
                    Email = "mala94@gmail.com"
                }
            );

            modelBuilder.Entity<Service>().HasData(
                new Service
                {
                    Id = 1,
                    Name = "Sisanje",
                    LengthInMinutes = 30,
                    Price = 60
                },
                new Service
                {
                    Id = 2,
                    Name = "Sisanje i pranje kose",
                    LengthInMinutes = 45,
                    Price = 90
                },
                new Service
                {
                    Id = 3,
                    Name = "Sisanje razor fade",
                    LengthInMinutes = 45,
                    Price = 90
                }
            );

            modelBuilder.Entity<Appointment>().HasData(
                new Appointment
                {
                    Id = 1,
                    Date = System.DateTime.Now,
                    ServiceId = 1,
                    HairdresserId = 1,
                    CustomerId = 1
                }
            );
        }
    }
}
