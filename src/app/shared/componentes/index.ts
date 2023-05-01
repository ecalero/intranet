
import { LoadingComponent } from "./loading/loading.component";
import { NuevoComponent } from "./modal/form/plantilla/nuevo/nuevo.component";

//importa todos los componentes
export const componentes: any[]=[
NuevoComponent,
LoadingComponent
];
//exporta todos los componenentes
export * from './modal/form/plantilla/nuevo/nuevo.component';
export * from './loading/loading.component';