using OpenQA.Selenium.Chrome;
using OpenQA.Selenium;
using SeleniumTests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium.Support.UI;

namespace lr10
{
    public class ChangeProductParameterTest
    {
        private IWebDriver _driver;

        public ChangeProductParameterTest(IWebDriver driver)
        {
            _driver = driver;
        }

        public void GoToPage(string url)
        {
            _driver.Navigate().GoToUrl(url);
        }

        public void ClickShopLink()
        {
            _driver.FindElement(By.LinkText("Shop")).Click();
        }
    }

    public class ShopPage
    {
        private IWebDriver _driver;

        public ShopPage(IWebDriver driver)
        {
            _driver = driver;
        }

        public void SelectProduct(string productName)
        {
            _driver.FindElement(By.LinkText(productName)).Click();
        }

        public void AddToCart()
        {
            _driver.FindElement(By.Name("Add to cart")).Click();
        }

        public void GoToCart()
        {
            _driver.FindElement(By.ClassName("btn is--icon-left cart--link")).Click();
        }
    }

    public class CartPage
    {
        private IWebDriver _driver;

        public CartPage(IWebDriver driver)
        {
            _driver = driver;
        }

        public void ChangeShippingCountry(string country)
        {
            Thread.Sleep(3000); 
            IWebElement countryDropdown = _driver.FindElement(By.Id("basket_country_list"));
            countryDropdown.SendKeys(country);
        }

        public void ChangePaymentMethod(string method)
        {
            Thread.Sleep(3000); 
            IWebElement paymentMethodDropdown = _driver.FindElement(By.Id("basket_payment_list"));
            paymentMethodDropdown.SendKeys(method);
        }

        public void Checkout()
        {
            _driver.FindElement(By.LinkText("Checkout")).Click();
        }

       /* public void ChangePaymentCurrency(string currency)
        {
            IWebElement currencyDropdown = _driver.FindElement(By.Id("currencyDropdown"));
            currencyDropdown.SendKeys(currency);
        }*/

        /*public void FillForm(string name, string address, string email)
        {
            _driver.FindElement(By.Id("register_personal_customer_type")).SendKeys(name);
            _driver.FindElement(By.Id("addressInput")).SendKeys(address);
            _driver.FindElement(By.Id("emailInput")).SendKeys(email);
        }*/
    }

    [TestFixture]
    public class PurchaseTest
    {
        private IWebDriver _driver;
        private ChangeProductParameterTest _mainPage;
        private ShopPage _shopPage;
        private CartPage _cartPage;

        [SetUp]
        public void Setup()
        {
            _driver = new ChromeDriver();
            _driver.Manage().Window.Maximize();
            _mainPage = new ChangeProductParameterTest(_driver);
            _shopPage = new ShopPage(_driver);
            _cartPage = new CartPage(_driver);
        }

        [Test]
        public void TestPurchaseWorkflow()
        {
            _mainPage.GoToPage("https://www.bvb.de/eng");
            _mainPage.ClickShopLink();
            _shopPage.SelectProduct("BVB home jersey 23/24");
            _shopPage.AddToCart();
            _shopPage.GoToCart();
            _cartPage.ChangeShippingCountry("Netherlands");
            _cartPage.ChangePaymentMethod("Payment Method");
           //_cartPage.ChangePaymentCurrency("Currency");
            //_cartPage.FillForm("John Doe", "Address", "example@example.com");
        }

        [TearDown]
        public void CloseBrowser()
        {
            _driver.Quit();
        }
    }
}
