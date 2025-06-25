import { Page, expect } from '@playwright/test';

export class NuevaVentaPage {
    constructor(private page: Page) { }

    //          <<<<<<<<<< Localizadores >>>>>>>>>>

    //<<<<<<<<<< Buttons >>>>>>>>>>
    private generarBtn = 'button:has-text("Generar")';
    private buscarCliente = '#formCabeceraComp button:has-text("Buscar")';
    private buscarItem = '#formDetalleComp .ui-g div:has-text("Código") button';
    private agregarProductoBtn = '#formDetalleComp .ui-g button[title=Agregar]';
    private comboTitle = 'span.SpanLabelCmb:has-text("Punto de Venta") [role="combobox"]'
    //<<<<<<<<<< Inputs >>>>>>>>>>
    private clienteInput = '#formCabeceraComp .ui-g div:has-text("Cliente") input';
    private codProductoBetaInput = '#popupBuscadorItemBeta .MdInput:contains(Código:) input'
    private codigoProductoInput = '.card #formDetalleComp .ui-g div:has-text("Código de Producto") input'
    private nombreProductoInput = '#formDetalleComp .ui-g div:has-text("Producto(*):") input';
    private precioUnitarioInput = 'span span input[title="$ "]';
    //<<<<<<<<<< Assertions >>>>>>>>>>
    private buscadorItemsAssert = '[id="popupBuscadorItemBeta"]';


    //<<<<<<<<<< Methods >>>>>>>>>>
    getModulo(modulo: string) {
        return this.page.locator(`[data-pr-tooltip="${modulo}"]`);
    }
    getSubModulo(subModulo: string) {
        return this.page.locator(`a:has-text("${subModulo}")`);
    }

    getComboTitle(tittle: string) {
        return this.page.locator(`span.SpanLabelCmb:has-text("${tittle}") [role="combobox"]`);
    }
    getComboOp(option: string) {
        return this.page.getByRole('option', { name: option, exact: true })
    }

    async generarVenta() {
        await this.page.getByRole('button', { name: 'Generar' }).click();
    }

    async comfirmDialog() {
        await this.page.getByRole('button', { name: 'Aceptar' }).click();
    }
    async cargarDatosComprobante(cliente: string, puntoDeVenta: string, tipoComprobante: string) {
        const clienteInp = await this.page.locator(this.clienteInput);
        await clienteInp.fill(cliente)
        await clienteInp.press('Enter');
        await this.getComboTitle('Tipo de Comprobante').click();
        await this.getComboOp(tipoComprobante).click();
        await this.page.waitForTimeout(1000);
        await this.getComboTitle('Punto de Venta').click();
        await this.getComboOp(puntoDeVenta).click();
    }

    async cargarItem(cod: string, valor: string) {
        const input = await this.page.locator(this.codigoProductoInput).first()
        const nameinput = await this.page.locator(this.nombreProductoInput).last();
        const precioInput = await this.page.locator(this.precioUnitarioInput).first();
        await input.fill(cod);
        await input.press('Enter');
        await expect(nameinput).toHaveValue(/.+/);//espera que el input tenga un valor
        await precioInput.fill(''); //limpio el input de precio
        await precioInput.pressSequentially(valor);//escribo el valor del precio se usa asi para simular tipeo recomendable probar fill antes
        await precioInput.press('Enter')
        await this.page.click(this.agregarProductoBtn);
        await expect(input).toHaveValue('')//espero a que el input se limpie
    }


}
