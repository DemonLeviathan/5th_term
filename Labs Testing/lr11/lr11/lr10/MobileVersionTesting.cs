using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace lr10
{
    [TestFixture]
    public class MobileVersionTest
    {
        private IWebDriver _driver;
        private HomePage _homePage;

        [SetUp]
        public void Setup()
        {
            ChromeOptions options = new ChromeOptions();
            options.EnableMobileEmulation("iPhone XR");
            _driver = new ChromeDriver(options);
            _homePage = new HomePage(_driver);
        }

        [Test]
        public void TestMobileSite()
        {
            _homePage.GoTo();
            Assert.IsTrue(_homePage.IsMobileView(), "The site is not in mobile view");
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
        private readonly string _url = "https://www.bvb.de/eng";
        private readonly By _menuButton = By.ClassName("invert-rotate");

        public HomePage(IWebDriver driver)
        {
            _driver = driver;
        }

        public void GoTo()
        {
            _driver.Navigate().GoToUrl(_url);
        }

        public bool IsMobileView()
        {
            return IsElementPresent(_menuButton);
        }

        private bool IsElementPresent(By locator)
        {
            try
            {
                return _driver.FindElement(locator).Displayed;
            }
            catch (NoSuchElementException)
            {
                return false;
            }
        }
    }
}
