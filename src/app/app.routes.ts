import { Routes } from '@angular/router';
import { SelecaoComponent } from './selecao/selecao.component';

export const routes: Routes = [
    { path: '', redirectTo: 'selecao', pathMatch: 'full' },
    { path: 'selecao', component: SelecaoComponent }
];
