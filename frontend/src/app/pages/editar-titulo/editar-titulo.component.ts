import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TituloService } from '../../services/titulo.service';

@Component({
  selector: 'app-editar-titulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-titulo.component.html',
})
export class EditarTituloComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tituloService = inject(TituloService);

  tituloForm = this.fb.group({
    numeroTitulo: [''],
    nomeDevedor: ['', Validators.required],
    cpfDevedor: ['', Validators.required],
    porcentagemJuros: [0],
    porcentagemMulta: [0],
  });

  ngOnInit(): void {
    const numeroTitulo = this.route.snapshot.paramMap.get('numeroTitulo');
    if (numeroTitulo) {
      this.tituloService.buscarPorNumero(numeroTitulo).subscribe(
        (
          dados: Partial<{
            numeroTitulo: string | null;
            nomeDevedor: string | null;
            cpfDevedor: string | null;
            porcentagemJuros: number | null;
            porcentagemMulta: number | null;
          }>,
        ) => {
          this.tituloForm.patchValue(dados);
        },
      );
    }
  }

  salvarAlteracoes() {
    this.tituloService
      .atualizar(this.tituloForm.value)
      .subscribe(() => this.router.navigate(['/']));
  }
}
