import { Angular2HackerNewsPage } from './app.po';

describe('angular2-hacker-news App', function() {
  let page: Angular2HackerNewsPage;

  beforeEach(() => {
    page = new Angular2HackerNewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
