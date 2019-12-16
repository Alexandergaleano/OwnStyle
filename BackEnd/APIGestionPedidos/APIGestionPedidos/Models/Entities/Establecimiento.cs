using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIGestionPedidos.Models.Entities
{
    public class Establecimiento
    {
        [Key]
        public int IdEstablecimiento { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(40)")]
        public string Nombre { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Direccion { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(15)")]
        public string Telefono { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(40)")]
        public string Email { get; set; }


    }
}
