﻿// <auto-generated />
using System;
using HairDo.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HairDo.Migrations
{
    [DbContext(typeof(HairDoDbContext))]
    [Migration("20190120202348_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HairDo.Entities.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CustomerId");

                    b.Property<DateTime>("Date");

                    b.Property<int>("HairdresserId");

                    b.Property<int>("ServiceId");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("HairdresserId");

                    b.HasIndex("ServiceId");

                    b.ToTable("Appointments");

                    b.HasData(
                        new { Id = 1, CustomerId = 1, Date = new DateTime(2019, 1, 20, 21, 23, 48, 534, DateTimeKind.Local), HairdresserId = 1, ServiceId = 1 }
                    );
                });

            modelBuilder.Entity("HairDo.Entities.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("Id");

                    b.ToTable("Customers");

                    b.HasData(
                        new { Id = 1, Email = "filip.lukacevic@gmail.com", Name = "Chevan", PhoneNumber = "09095434" },
                        new { Id = 2, Email = "mala94@gmail.com", Name = "Mala", PhoneNumber = "09095434" }
                    );
                });

            modelBuilder.Entity("HairDo.Entities.Hairdresser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Hairdressers");

                    b.HasData(
                        new { Id = 1, Name = "Anita" },
                        new { Id = 2, Name = "Ticbra" }
                    );
                });

            modelBuilder.Entity("HairDo.Entities.Schedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EndTime");

                    b.Property<int>("HairdresserId");

                    b.Property<string>("StartTime");

                    b.HasKey("Id");

                    b.HasIndex("HairdresserId");

                    b.ToTable("Schedule");

                    b.HasData(
                        new { Id = 1, EndTime = "14:00", HairdresserId = 1, StartTime = "8:00" }
                    );
                });

            modelBuilder.Entity("HairDo.Entities.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LengthInMinutes");

                    b.Property<string>("Name");

                    b.Property<int>("Price");

                    b.HasKey("Id");

                    b.ToTable("Services");

                    b.HasData(
                        new { Id = 1, LengthInMinutes = 30, Name = "Sisanje", Price = 60 },
                        new { Id = 2, LengthInMinutes = 45, Name = "Sisanje i pranje kose", Price = 90 },
                        new { Id = 3, LengthInMinutes = 45, Name = "Sisanje razor fade", Price = 90 }
                    );
                });

            modelBuilder.Entity("HairDo.Entities.Appointment", b =>
                {
                    b.HasOne("HairDo.Entities.Customer", "Customer")
                        .WithMany("Appointments")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HairDo.Entities.Hairdresser", "Hairdresser")
                        .WithMany("Appointments")
                        .HasForeignKey("HairdresserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HairDo.Entities.Service", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HairDo.Entities.Schedule", b =>
                {
                    b.HasOne("HairDo.Entities.Hairdresser", "Hairdresser")
                        .WithMany()
                        .HasForeignKey("HairdresserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
