using Castle.MicroKernel.SubSystems.Conversion;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIGestionPedidos.Models.Entities.Usuario
{
    public class UsuarioModel
    {
        [Column(TypeName = "nvarchar(20)")]
        public string NombreUsuario { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string Nombre { get; set; }

        [Column(TypeName = "nvarchar(15)")]
        public string Telefono { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string Direccion { get; set; }
    }
}
