using System.Collections.Generic;

namespace Desafio.Models
{
    public class Titulo
    {
        public string? NumeroTitulo { get; set; }
        public string? NomeDevedor { get; set; }
        public string? CpfDevedor { get; set; }
        public decimal PorcentagemJuros { get; set; }
        public decimal PorcentagemMulta { get; set; }
        public List<Parcela> Parcelas { get; set; } = new();
    }
}
