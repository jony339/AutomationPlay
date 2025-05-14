import userData from '../Fixture/userData.json';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login', { tag: ['@login'] }, () => {

    test('login dux', { tag: ['@login, @qa1'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        /* await page.goto('https://staging.duxsoftware.com.ar/');
        await page.fill('input[id="formLogin:inputUsuario"]', 'demo')
        await page.fill('input[id="formLogin:inputPassword"]', 'duxdemo')
        await page.getByRole('button', { name: 'Iniciar Sesión' }).click() */
        await loginPage.goto();
        await loginPage.login(userData.valid_user.user, userData.valid_user.pass);
        await expect(page).toHaveURL('https://staging.duxsoftware.com.ar/duxnew/estadisticas/dashboard');
        //await page.waitForLoadState('load');//load  networkidle
        await page.waitForSelector('button[aria-label="Acciones"]');


    })
})