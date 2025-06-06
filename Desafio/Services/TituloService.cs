using Desafio.Models;

namespace Desafio.Services
{
    public class TituloService
    {
        public decimal CalcularValorAtualizado(Titulo titulo)
        {
            DateTime hoje = DateTime.Now;

            decimal valorOriginal = titulo.Parcelas.Sum(p => p.Valor);
            decimal multa = valorOriginal * (titulo.PorcentagemMulta / 100);
            decimal juros = 0;

            foreach (var parcela in titulo.Parcelas)
            {
                int diasAtraso = (hoje - parcela.DataVencimento).Days;
                if (diasAtraso > 0)
                {
                    juros += (titulo.PorcentagemJuros / 100 / 30) * diasAtraso * parcela.Valor;
                }
            }

            return valorOriginal + multa + juros;
        }
    }
}
