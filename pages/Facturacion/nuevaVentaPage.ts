import { Page } from '@playwright/test';

export class NuevaVentaPage {
    constructor(private page: Page) { }

    //          <<<<<<<<<< Localizadores >>>>>>>>>>

    //<<<<<<<<<< Buttons >>>>>>>>>>
    private generarBtn = 'button:has-text("Generar")';
    private buscarCliente = '#formCabeceraComp button:has-text("Buscar")';
    private buscarItem = '#formDetalleComp .ui-g div:has-text("Código") button';
    //<<<<<<<<<< Inputs >>>>>>>>>>
    private codProductoBetaInput = '#popupBuscadorItemBeta .MdInput:contains(Código:) input'
    private codigoProductoInput = '.card #formDetalleComp .ui-g div:contains(Código de Producto) input'
    //span:has-text("Ventas")
    //<<<<<<<<<< Assertions >>>>>>>>>>
    private buscadorItemsAssert = '[id="popupBuscadorItemBeta"]';


    //<<<<<<<<<< Methods >>>>>>>>>>
    getModulo(modulo: string) {
        return this.page.locator(`[data-pr-tooltip="${modulo}"]`);
    }
    getSubModulo(subModulo: string) {
        return this.page.locator(`a:has-text("${subModulo}")`);
    }
    async cargarDatosComprobante() {
        await this.page.hover(this.buscarCliente);
        await this.page.click(this.buscarCliente);

    }

    async cargarItem() {
        await this.page.hover(this.buscarItem);
        await this.page.click(this.buscarItem);
        await this.page.waitForSelector(this.buscadorItemsAssert);

    }


}
