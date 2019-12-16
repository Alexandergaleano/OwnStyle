using APIGestionPedidos.Models.Entities;
using APIGestionPedidos.Models.Entities.Usuario;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGestionPedidos.Models.DAL
{
    public class AplicationDbContext: IdentityDbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext>options):base(options)
        {

        }

        public DbSet<Empleado>Empleado { get; set; }
        public DbSet<Establecimiento> Establecimiento { get; set; }
        public DbSet<UsuarioIdentity> UsuarioIdentity { get; set; }

    }
}
