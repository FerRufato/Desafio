# Etapa 1 - build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore Desafio.csproj
RUN dotnet publish Desafio.csproj -c Release -o /app/publish

# Etapa 2 - runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "Desafio.dll"]
