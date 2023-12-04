using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace lr10
{
    public class MobileVersionTest
    {
        private IWebDriver _driver;

        [SetUp]
        public void Setup()
        {
            ChromeOptions options = new ChromeOptions();
            options.EnableMobileEmulation("iPhone XR"); 
            _driver = new ChromeDriver(options);
        }

        [Test]
        public void TestMobileSite()
        {
            HomePage homePage = new HomePage(_driver);
            homePage.NavigateTo("https://www.bvb.de/eng");

            Assert.IsTrue(homePage.IsMobileView(), "The site is not in mobile view");
        }

        [TearDown]
        public void CloseBrowser()
        {
            _driver.Quit();
        }
    }

    public class HomePage
    {
        private readonly IWebDriver _driver;

        public HomePage(IWebDriver driver)
        {
            _driver = driver;
        }

        public void NavigateTo(string url)
        {
            _driver.Navigate().GoToUrl(url);
        }

        public bool IsMobileView()
        {
            IWebElement menuButton = null;

            try
            {
                // Проверяем наличие элемента, характерного для мобильной версии сайта
                menuButton = _driver.FindElement(By.ClassName("invert-rotate"));
            }
            catch (NoSuchElementException)
            {
                // Если элемент не найден, то считаем, что сайт не отображается в мобильном виде
                return false;
            }

            return menuButton.Displayed;
        }
    }
}
