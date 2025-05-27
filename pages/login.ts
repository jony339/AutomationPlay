import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    //          <<<<<<<<<< Localizadores >>>>>>>>>>

    //<<<<<<<<<< Buttons >>>>>>>>>>
    private loginBtn = 'button[type="submit"]';
    //<<<<<<<<<< Inputs >>>>>>>>>>
    private userInput = 'input[id="formLogin:inputUsuario"]';
    private passInput = 'input[id="formLogin:inputPassword"]';
    //<<<<<<<<<< Assertions >>>>>>>>>>


    //<<<<<<<<<< Methods >>>>>>>>>>
    async goto() {
        await this.page.goto('https://staging.duxsoftware.com.ar/');
    }

    async login(user: string, pass: string) {
        await this.page.fill(this.userInput, user);
        await this.page.fill(this.passInput, pass);
        await this.page.click(this.loginBtn);
        await this.page.waitForLoadState('load');
    }

    async isLoggedIn() {
        await this.page.waitForURL('/dashboard');
    }
}

export class HomePage {
    constructor(private page: Page) { }

    //          <<<<<<<<<< Localizadores >>>>>>>>>>

    //<<<<<<<<<< Buttons >>>>>>>>>>
    //private moduloBtn = '[data-pr-tooltip="FACTURACION"]';
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
    async irAlModulo(modulo: string, subModulo: string) {
        await this.getModulo(modulo).hover();
        await this.getModulo(modulo).click();
        await this.page.waitForSelector('a:has-text("' + subModulo + '")');
        await this.getSubModulo(subModulo).click();
    }


}
