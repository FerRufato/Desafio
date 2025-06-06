import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/listar-titulos/listar-titulos.component').then(
        (m) => m.ListarTitulosComponent,
      ),
  },
  {
    path: 'incluir',
    loadComponent: () =>
      import('./pages/incluir-titulos/incluir-titulo.component').then(
        (m) => m.IncluirTituloComponent,
      ),
  },
  {
    path: 'editar/:numeroTitulo',
    loadComponent: () =>
      import('./pages/editar-titulo/editar-titulo.component').then(
        (m) => m.EditarTituloComponent,
      ),
  },
];
