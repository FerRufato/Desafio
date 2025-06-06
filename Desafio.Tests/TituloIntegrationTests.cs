using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using Desafio;

namespace Desafio.Tests
{
    public class TituloIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public TituloIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Deve_Retornar_StatusCode200_Quando_ListarTitulos()
        {
            var response = await _client.GetAsync("/api/titulos");
            response.EnsureSuccessStatusCode(); // Vai falhar se não for 2xx
        }
    }
}
