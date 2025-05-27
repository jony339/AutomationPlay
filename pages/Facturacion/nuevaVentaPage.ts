import { Page } from '@playwright/test';

export class NuevaVentaPage {
    constructor(private page: Page) { }

    //          <<<<<<<<<< Localizadores >>>>>>>>>>

    //<<<<<<<<<< Buttons >>>>>>>>>>
    private generarBtn = 'button:has-text("Generar")';
    //<<<<<<<<<< Inputs >>>>>>>>>>
    //span:has-text("Ventas")
    //<<<<<<<<<< Assertions >>>>>>>>>>


    //<<<<<<<<<< Methods >>>>>>>>>>
    getModulo(modulo: string) {
        return this.page.locator(`[data-pr-tooltip="${modulo}"]`);
    }
    getSubModulo(subModulo: string) {
        return this.page.locator(`a:has-text("${subModulo}")`);
    }
    /* async irANuevaventa() {
        await this.page.hover(this.nuevaVentaBtn);
        await this.page.click(this.nuevaVentaBtn);

    } */


}
