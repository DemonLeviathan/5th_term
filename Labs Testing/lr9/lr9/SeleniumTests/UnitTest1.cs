using System;
using System.Text;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
// C:\Users\n2309\.nuget\packages\nunit.consolerunner\3.16.3\tools

namespace SeleniumTests
{
        [TestFixture]
        public class TestSearchWorkingFilter
        {
            IWebDriver driver;

            [SetUp]
            public void Setup()
            {
                driver = new ChromeDriver();
                driver.Manage().Window.Maximize();
            }

            [Test]
            public void TestSearchFilter()
            {
                driver.Navigate().GoToUrl("https://www.bvb.de/eng"); 

                // ��� 1: ������� �� ����
                // ��� 2: ������ �Shop�
                driver.FindElement(By.LinkText("Shop")).Click();

                // ��� 3: ������ �Sale�
                IWebElement element = driver.FindElement(By.LinkText("Shop"));
                Actions actions = new Actions(driver);
                actions.MoveToElement(element).Click().Build().Perform();


                // ��� 4: ������ �� ���������� ���� �Filter�
               driver.FindElement(By.CssSelector(".action--filter-btn .filter--trigger")).Click();


            // ��� 5: ������� ������� ������� � ��������� �����, ���� ����� ����� � �������
            IWebElement priceSegment = driver.FindElement(By.Id("filter-panel--flyout")); 
                priceSegment.Click(); 
                IWebElement availableCheckbox = driver.FindElement(By.Id("filter-panel--title")); 
                if (!availableCheckbox.Selected)
                {
                    availableCheckbox.Click(); 
                }

                // ��� 6: ������ ������ �<Quantity items found>�
                IWebElement itemsFoundButton = driver.FindElement(By.Id("btn is--primary filter--btn-apply is--large is--icon-right")); 
                itemsFoundButton.Click();
             
                Assert.AreEqual("https://www.bvbonlineshop.com/en/sale/?p=1&o=1&n=10&max=10.00", driver.Url); 
            }

            [TearDown]
            public void CloseBrowser()
            {
                // �������� ��������
                driver.Quit();
            }
        }
}