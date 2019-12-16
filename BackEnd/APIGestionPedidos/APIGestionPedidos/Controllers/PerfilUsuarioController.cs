using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIGestionPedidos.Models.Entities.Usuario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace APIGestionPedidos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilUsuarioController : ControllerBase
    {
        private readonly UserManager<UsuarioIdentity> _userManager;
        public PerfilUsuarioController(UserManager<UsuarioIdentity> userManager)
        {
            _userManager = userManager;

        }

        [HttpGet]
        [Authorize]
        public async Task<Object> ObtenerPerfilUsuario()
        {
            string usuarioId = User.Claims.First(c => c.Type == "UsuarioID").Value;
            var usuario = await _userManager.FindByIdAsync(usuarioId).ConfigureAwait(false);

            return new
            {
                usuario.Nombre,
                usuario.Email,
                usuario.UserName,
                usuario.Telefono,
                usuario.Direccion
            };
        }
    }
}