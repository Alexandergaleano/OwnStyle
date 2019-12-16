using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using APIGestionPedidos.Models.Entities;
using APIGestionPedidos.Models.Entities.Usuario;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace APIGestionPedidos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
        
    public class UsuarioController : ControllerBase
    {
        private readonly UserManager<UsuarioIdentity> _userManager;
        private readonly SignInManager<UsuarioIdentity> _signInManager;

        private readonly ConfiguracionGlobal _configuracionGlobal;

        public UsuarioController(UserManager<UsuarioIdentity> userManager, SignInManager<UsuarioIdentity> signInManager, IOptions<ConfiguracionGlobal> configuracionGlobal)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuracionGlobal = configuracionGlobal.Value;

        }

        [HttpPost]
        [Route("Registro")]
        //POST api/Usuario/Registro
        public async Task<Object> PostUsuario(UsuarioModel usuarioModel)
        {
            UsuarioIdentity usuario = new UsuarioIdentity()
            {
                UserName = usuarioModel.NombreUsuario,
                Nombre = usuarioModel.Nombre,
                Email = usuarioModel.Email,
                Telefono = usuarioModel.Telefono,
                Direccion = usuarioModel.Direccion
                
            };

            try
            {
                var resultado = await _userManager.CreateAsync(usuario, usuarioModel.Password).ConfigureAwait(false);
                return Ok(resultado);

            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult>Login(LoginModel loginModel)
        {
            var usuario = await _userManager.FindByNameAsync(loginModel.NombreUsuario).ConfigureAwait(false);
            if (usuario != null && await _userManager.CheckPasswordAsync(usuario, loginModel.Password).ConfigureAwait(false))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UsuarioID", usuario.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuracionGlobal.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });

            }
            else
            {
                return BadRequest(new { mensaje = "Nombre de usuario o contraseña incorrecta" });
            }



        }
    }
}