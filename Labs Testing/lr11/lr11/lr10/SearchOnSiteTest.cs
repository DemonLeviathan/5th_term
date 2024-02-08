using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SeleniumTests
{
    public class MainPage
    {
        private IWebDriver _driver;

        public MainPage(IWebDriver driver)
        {
            _driver = driver;
        }

        public void GoToPage(string url)
        {
            _driver.Navigate().GoToUrl(url);
        }

        public void ClickNewsLink()
        {
            _driver.FindElement(By.LinkText("News")).Click();
        }
    }

    public class SearchPage
    {
        private IWebDriver _driver;

        public SearchPage(IWebDriver driver)
        {
            _driver = driver;
        }

        public void EnterSearchQuery(string query)
        {
            IWebElement searchInput = _driver.FindElement(By.Name("q"));
            searchInput.SendKeys(query);
            searchInput.SendKeys(Keys.Enter);
        }
    }

    [TestFixture]
    public class SearchTest
    {
        private IWebDriver _driver;
        private MainPage _mainPage;
        private SearchPage _searchPage;

        [SetUp]
        public void Setup()
        {
            _driver = new ChromeDriver();
            _driver.Manage().Window.Maximize();
            _mainPage = new MainPage(_driver);
            _searchPage = new SearchPage(_driver);
        }

        [Test]
        public void TestSearchFunctionality()
        {
            _mainPage.GoToPage("https://www.bvb.de/eng");
            _mainPage.ClickNewsLink();
            _searchPage.EnterSearchQuery("news");
        }

        [TearDown]
        public void CloseBrowser()
        {
            _driver.Quit();
        }
    }
}
