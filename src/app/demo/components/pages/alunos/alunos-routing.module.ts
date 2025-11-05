import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlunosComponent } from './alunos.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AlunosComponent }
	])],
	exports: [RouterModule]
})
export class AlunosRoutingModule { }
