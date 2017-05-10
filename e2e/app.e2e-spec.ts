import { GiveMeMoneyPage } from './app.po';

describe('give-me-money App', () => {
  let page: GiveMeMoneyPage;

  beforeEach(() => {
    page = new GiveMeMoneyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
