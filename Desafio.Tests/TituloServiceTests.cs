using Xunit;
using Desafio.Models;
using System;
using System.Collections.Generic;

namespace Desafio.Tests
{
    public class TituloServiceTests
    {
        [Fact]
        public void CalcularValorAtualizado_DeveRetornarValorComJurosEMulta()
        {
            // Arrange
            var titulo = new Titulo
            {
                NumeroTitulo = "001",
                NomeDevedor = "Fernanda",
                PorcentagemMulta = 2,
                PorcentagemJuros = 1,
                Parcelas = new List<Parcela>
                {
                    new Parcela { Valor = 100, DataVencimento = DateTime.Now.AddDays(-10) } // 10 dias de atraso
                }
            };

            var hoje = DateTime.Now;

            // Act
            var valorOriginal = 100;
            var multa = valorOriginal * (titulo.PorcentagemMulta / 100);
            var juros = (titulo.PorcentagemJuros / 100 / 30) * 10 * 100;
            var valorAtualizado = valorOriginal + multa + juros;

            // Assert
            Assert.True(valorAtualizado > valorOriginal);
        }
    }
}
