using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using System;

namespace SeleniumTests
{
    [TestFixture]
    public class VideoPlayingTesting
    {
        IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            driver.Manage().Window.Maximize();
        }

        [Test]
        public void TestVideoSubtitles()
        {
            driver.Navigate().GoToUrl("https://www.bvb.de/eng");

            // Шаг 1: Заходим на сайт
            // Шаг 2: Нажать “BVB-TV”
            driver.FindElement(By.LinkText("BVB-TV")).Click();

            driver.FindElement(By.CssSelector("slick-track")).Click();
            //IWebElement videoElement = driver.FindElement(By.CssSelector("slick-track"));

            // Используем Actions для клика на этот элемент
            /*Actions action = new Actions(driver);
            action.MoveToElement(videoElement).Click().Build().Perform();*/

            // Шаг 3: Выбрать английские субтитры (если доступны)
            /*IWebElement subtitleButton = driver.FindElement(By.CssSelector("your-subtitle-selector"));
            subtitleButton.Click();*/ // Нажатие кнопки для выбора английских субтитров

            // Добавьте дальнейшие проверки, если необходимо
        }

        [TearDown]
        public void CloseBrowser()
        {
            driver.Quit();
        }
    }
}
