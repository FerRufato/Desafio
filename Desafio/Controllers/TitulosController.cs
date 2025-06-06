using Microsoft.AspNetCore.Mvc;
using Desafio.Models;
using Desafio.Services;

namespace Desafio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TitulosController : ControllerBase
    {
        private static List<Titulo> titulos = new();

        private readonly TituloService _tituloService = new TituloService(); // ✅ injetando o service

        [HttpPost]
        public IActionResult CadastrarTitulo([FromBody] Titulo titulo)
        {
            titulos.Add(titulo);
            return Ok("Título cadastrado com sucesso!");
        }

        [HttpGet]
        public IActionResult ListarTitulos()
        {
            var hoje = DateTime.Now;

            var resultado = titulos.Select(t => new
            {
                t.NumeroTitulo,
                t.NomeDevedor,
                QuantidadeParcelas = t.Parcelas.Count,
                ValorOriginal = t.Parcelas.Sum(p => p.Valor),
                DiasEmAtraso = t.Parcelas.Sum(p => (hoje - p.DataVencimento).Days > 0 ? (hoje - p.DataVencimento).Days : 0),
                ValorAtualizado = _tituloService.CalcularValorAtualizado(t) // ✅ delegando o cálculo
            });

           return Ok(new { mensagem = "Título cadastrado com sucesso!" });

        }

        // ✅ DELETAR título
       [HttpDelete("{numeroTitulo}")]
public IActionResult DeletarTitulo(string numeroTitulo)
{
    var titulo = titulos.FirstOrDefault(t => t.NumeroTitulo == numeroTitulo);
    if (titulo == null)
        return NotFound("Título não encontrado.");

    titulos.Remove(titulo);
    return Ok(new { mensagem = "Título excluído com sucesso!" }); // ✅ Aqui
}

        // ✅ ATUALIZAR título
       [HttpPut("{numeroTitulo}")]
public IActionResult AtualizarTitulo(string numeroTitulo, [FromBody] Titulo tituloAtualizado)
{
    var index = titulos.FindIndex(t => t.NumeroTitulo == numeroTitulo);
    if (index == -1)
        return NotFound("Título não encontrado.");

    titulos[index] = tituloAtualizado;
    return Ok(new { mensagem = "Título atualizado com sucesso!" }); // ✅ Aqui!
}

        [HttpGet("{numeroTitulo}")]
public IActionResult BuscarTitulo(string numeroTitulo)
{
    var titulo = titulos.FirstOrDefault(t => t.NumeroTitulo == numeroTitulo);
    if (titulo == null)
        return NotFound("Título não encontrado.");

    return Ok(titulo);
}

        
    }
}
