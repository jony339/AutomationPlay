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
