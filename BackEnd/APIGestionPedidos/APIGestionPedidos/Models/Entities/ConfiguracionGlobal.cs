using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIGestionPedidos.Models.Entities
{
    public class ConfiguracionGlobal
    {
        public string JWT_Secret { get; set; }
        public string URLCliente { get; set; }
    }
}
