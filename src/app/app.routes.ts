import { Routes } from '@angular/router';
import { SelecaoComponent } from './components/selecao/selecao.component';
import { SalaComponent } from './components/sala/sala.component';

export const routes: Routes = [
    { path: '', redirectTo: 'selecao', pathMatch: 'full' },
    { path: 'selecao', component: SelecaoComponent },
    { path: 'sala/:id', component: SalaComponent }
];
