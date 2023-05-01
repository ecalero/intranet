import { ITabTablas } from "./tabtablas.metadata";

export interface ICatalogoTabla {
    IDCATALOGOTABLAS: number;
	NOMBRE: string;
	ESTADO: string;
	FECHA_CREACION: Date;
	ABREVIATURA: string;
    tabtablas:ITabTablas;
}