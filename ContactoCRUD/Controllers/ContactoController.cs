using ContactoCRUD.Models;
using ContactoCRUD.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactoCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        public readonly DBPRUEBASContext _dbcontext;
        public readonly IEmailServices _emailService;

        public ContactoController(DBPRUEBASContext context, IEmailServices emailService)
        {
            _dbcontext = context;
            _emailService = emailService;
        }



        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Contacto> lista = await _dbcontext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }


        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Contacto request)
        {
            try
            {
                await _dbcontext.Contactos.AddAsync(request);
                await _dbcontext.SaveChangesAsync();

                // Llama al servicio de envío de correos electrónicos
                var emailDTO = new EmailDTO
                {
                    Para = request.Correo, // Asumiendo que el campo Email contiene la dirección de correo del usuario
                    Asunto = "🎉 ¡Bienvenido a Mis Contactos! 🚀",
                    Contenido = $@"<html>
                                    <body>
                                        <p>
                                            ¡Hola {request.Nombre}👋!!,<br /><br />
                                            Estoy emocionado de tenerte como parte de mi comunidad. 🌟<br /><br />
                                            Espero que disfrutes de tu tiempo aquí y que encuentres mi aplicación útil y emocionante.<br /><br />
                                            Siempre estoy trabajando para mejorar y agregar nuevas características. ¡Tu opinión y comentarios son muy importantes para mí! 😊<br /><br />
                                            No dudes en ponerte en contacto si tienes alguna pregunta o sugerencia. ¡Estoy aquí para ayudarte! 📬<br /><br />
                                            ¿Quieres conocer más sobre mí? ¡Visita mis perfiles en <a href='https://github.com/francoedson'>GitHub</a> y <a href='https://www.linkedin.com/in/franco-mari%C3%B1o-2a289620a/'>LinkedIn</a>!<br /><br />
                                            ¡Gracias por unirte y ser parte de la comunidad! 🙌<br /><br />
                                            ¡Diviértete explorando y usando la aplicación! 🎈<br /><br />
                                            Atentamente,<br />
                                            Franco Mariño
                                        </p>
                                    </body>
                                </html>"
                };

                _emailService.SendEmail(emailDTO);

                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            catch (Exception ex)
            {
                // Manejo de errores
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Contacto request)
        {
            _dbcontext.Contactos.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }


        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Contacto contacto = _dbcontext.Contactos.Find(id);
            _dbcontext.Contactos.Remove(contacto);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
