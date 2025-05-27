import userData from '../Fixture/userData.json';
import asserts from '../Fixture/asserts.json';
import { test, expect } from '@playwright/test';
import { LoginPage, HomePage } from '../pages/login';
import { GestionVentasPage } from '../pages/Facturacion/gestionVentasPage';

test.describe('Login', { tag: ['@login'] }, () => {

    test('login dux', { tag: ['@login, @qa1'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        /* await page.goto('https://staging.duxsoftware.com.ar/');
        await page.fill('input[id="formLogin:inputUsuario"]', 'demo')
        await page.fill('input[id="formLogin:inputPassword"]', 'duxdemo')
        await page.getByRole('button', { name: 'Iniciar Sesión' }).click() */
        await loginPage.goto();
        await loginPage.login(userData.valid_user.user, userData.valid_user.pass);
        await expect(page).toHaveURL(asserts.urls.dashboard);
        //await page.waitForLoadState('load');//load  networkidle
        await page.waitForSelector('button[aria-label="Acciones"]');


    })

    test('venta simple', { tag: ['@login, @ventasimple'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const gestionVentasPage = new GestionVentasPage(page);
        await loginPage.goto();
        await loginPage.login(userData.valid_user.user, userData.valid_user.pass);
        await expect(page).toHaveURL(asserts.urls.dashboard);
        //await page.waitForLoadState('load');//load  networkidle
        await page.waitForSelector('button[aria-label="Acciones"]');
        await homePage.irAlModulo('FACTURACION', 'Ventas');
        await page.waitForURL(asserts.urls.gestion_ventas);
        await expect(page).toHaveURL(asserts.urls.gestion_ventas);
        await gestionVentasPage.irANuevaventa();
        await page.waitForURL(asserts.urls.nueva_venta);
        await expect(page).toHaveURL(asserts.urls.nueva_venta);
    })
})