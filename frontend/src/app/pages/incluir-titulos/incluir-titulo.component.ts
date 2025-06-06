import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloService } from '../../services/titulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incluir-titulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './incluir-titulo.component.html',
})
export class IncluirTituloComponent {
  private fb = inject(FormBuilder);
  private tituloService = inject(TituloService);
  private router = inject(Router);

  tituloForm = this.fb.group({
    numeroTitulo: ['', Validators.required],
    nomeDevedor: ['', Validators.required],
    cpfDevedor: ['', Validators.required],
    porcentagemJuros: [0, Validators.required],
    porcentagemMulta: [0, Validators.required],
    parcelas: this.fb.array([
      this.fb.group({
        numero: [1, Validators.required], // 🔁 ALTERADO
        dataVencimento: ['', Validators.required],
        valor: [0, Validators.required],
      }),
    ]),
  });

  get parcelas(): FormArray {
    return this.tituloForm.get('parcelas') as FormArray;
  }

  adicionarParcela() {
    this.parcelas.push(
      this.fb.group({
        numero: [this.parcelas.length + 1, Validators.required], // 🔁 ALTERADO
        dataVencimento: ['', Validators.required],
        valor: [0, Validators.required],
      }),
    );
  }

  removerParcela(i: number) {
    this.parcelas.removeAt(i);
  }

  onSubmit(): void {
    if (this.tituloForm.valid) {
      console.log('Enviando título:', this.tituloForm.value); // ✅ Ajuda no debug

      this.tituloService.incluir(this.tituloForm.value).subscribe({
        next: () => {
          alert('Título incluído com sucesso!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro ao incluir título', error);
          alert(
            'Erro ao incluir título. Verifique os dados e tente novamente.',
          );
        },
      });
    } else {
      alert('Formulário inválido. Verifique os campos.');
    }
  }
}
