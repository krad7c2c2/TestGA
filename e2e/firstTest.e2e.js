describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('muestra error si campos están vacíos', async () => {
    await element(by.id('btn-login')).tap();
    await expect(element(by.text('Campos vacíos'))).toBeVisible();
  });

  it('muestra error si el nombre tiene números', async () => {
    await element(by.id('input-name')).typeText('juan123');
    await element(by.id('input-password')).typeText('secret');
    await element(by.id('btn-login')).tap();
    await expect(element(by.text('El nombre solo debe contener letras'))).toBeVisible();
  });

  it('navega a Home si los datos son correctos', async () => {
    await element(by.id('input-name')).clearText();
    await element(by.id('input-password')).clearText();
    await element(by.id('input-name')).typeText('Juan');
    await element(by.id('input-password')).typeText('secret');
    await element(by.id('btn-login')).tap();
    await expect(element(by.id('home-title'))).toBeVisible();
  });
});
