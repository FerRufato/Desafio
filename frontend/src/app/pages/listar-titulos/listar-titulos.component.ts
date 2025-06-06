import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TituloService } from '../../services/titulo.service';
import { TituloResumo } from '../../interfaces/titulo-resumo';

@Component({
  selector: 'app-listar-titulos',
  standalone: true,
  templateUrl: './listar-titulos.component.html',
  styleUrls: ['./listar-titulos.component.css'],
  imports: [CommonModule, CurrencyPipe, RouterModule],
})
export class ListarTitulosComponent implements OnInit {
  titulos: TituloResumo[] = [];

  constructor(
    private tituloService: TituloService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.carregarTitulos();
  }

  carregarTitulos(): void {
    this.tituloService.listar().subscribe((data: TituloResumo[]) => {
      this.titulos = data;
    });
  }

  incluirNovoTitulo(): void {
    this.router.navigate(['/incluir']);
  }

  editarTitulo(numeroTitulo: string): void {
    this.router.navigate(['/editar', numeroTitulo]);
  }

  excluirTitulo(numeroTitulo: string): void {
    if (confirm('Tem certeza que deseja excluir este título?')) {
      this.tituloService.excluir(numeroTitulo).subscribe({
        next: () => {
          this.carregarTitulos(); // ✅ Atualiza a lista após exclusão
        },
        error: (err) => {
          console.error('Erro ao excluir título:', err);
          alert('Ocorreu um erro ao excluir o título.');
        },
      });
    }
  }
}
