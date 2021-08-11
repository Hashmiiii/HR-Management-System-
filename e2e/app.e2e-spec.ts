import { HRManagementSystemFrontEndPage } from './app.po';

describe('hr-management-system-front-end App', () => {
  let page: HRManagementSystemFrontEndPage;

  beforeEach(() => {
    page = new HRManagementSystemFrontEndPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
