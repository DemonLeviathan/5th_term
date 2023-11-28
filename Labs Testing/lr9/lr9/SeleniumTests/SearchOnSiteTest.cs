using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace SeleniumTests
{
    [TestFixture]
    public class SearchTest
    {
        IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
        }

        [Test]
        public void TestSearchFunctionality()
        {
            // Шаг 1: Заходим на сайт
            driver.Navigate().GoToUrl("https://www.bvb.de/eng"); 

            // Шаг 2: Открываем любую страницу
            driver.FindElement(By.LinkText("News")).Click(); 

            // Шаг 3: В поисковую строку вводим какой-либо текст
            IWebElement searchInput = driver.FindElement(By.Name("q")); 
            searchInput.SendKeys("news"); 
            searchInput.SendKeys(Keys.Enter); // Нажимаем Enter, чтобы выполнить поиск

        }

        [TearDown]
        public void CloseBrowser()
        {
            driver.Quit();
        }
    }
}
