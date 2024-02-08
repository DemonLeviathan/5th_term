
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Lab11_Framework.Log.Log;
using static System.Net.WebRequestMethods;


namespace Lab11_Framework.Pages
{
    public class MainPage : DriverInfo.DriverInfo
    {
        public MainPage(IWebDriver driver) : base(driver)
        {
        }


        //Locators
        //Желательно делать всё по css-selector
        //private readonly string _baseUrl = "https://www.bvb.de/";
        private readonly string _baseUrl = "https://www.bvb.de/eng/News";
        
        private readonly By loginButtonLocator = By.CssSelector("button[type='submit'].btn.btn-primary.btn-block");
        private readonly By ButtonShopLocator = By.CssSelector("[onclick*='_trackEvent'][onclick*='Shop']");
        private readonly By acceptAllButtonLocator = By.XPath("//a[@class='cmpboxbtnyes' or @class='cmpboxbtncustom' or @class='cmpboxbtnno']");
        private readonly By CloseButtonLocator = By.XPath("//a[@class='language-overlay--link js--dismiss']");
        private readonly By crossColseButtonLocator = By.CssSelector("#language-modal > div > span");
        private readonly By saleButtonLocator = By.XPath("//span[text()='Sale']");
        private readonly By filterButtonLocator = By.XPath("//a[@class='filter--trigger btn is--small']");
        private readonly By filterReadyButtonLocalor = By.XPath("//label[@class='filter-panel--title']");
        private readonly By findButtonLocator = By.CssSelector("#filter > div.filter--actions.filter--actions-bottom > button");


        private readonly By twitterButtonLocator =
            By.CssSelector(
                "#bvb-meta-bar > div.meta-bar__content > div.meta-bar__part.meta-bar__right.meta-bar__items > a.meta-bar__twitter.meta-bar__item-bigicon");
        private readonly By emptyMessageLocator = By.CssSelector("body > div.wrapper.home-wrapper > main > section > div > div > p");

        private readonly By findByTextLocator = By.CssSelector("#bvb-meta-bar > div.meta-bar__content > div.meta-bar__part.meta-bar__right.meta-bar__items > form > span > input[type=submit]");

        private readonly By TextHolderLocator =
            By.CssSelector(
                "#bvb-meta-bar > div.meta-bar__content > div.meta-bar__part.meta-bar__right.meta-bar__items > form > input[type=text]");

        private readonly By FindedElements =
            By.CssSelector(
                "#begin-content > div > section > section > div > form > div.structure.structure-9-3.replace-structure-wrap > div:nth-child(2) > p");


        public MainPage GoToTwitter()
        {
            Thread.Sleep(2000);
            Driver.FindElement(twitterButtonLocator).Click();
            Info("[MainPage] GoToTwitter.");
            Thread.Sleep(4000);

            foreach (string handle in Driver.WindowHandles)
            {
                Driver.SwitchTo().Window(handle);
                string currentUrl = Driver.Url;
                if (currentUrl == "https://twitter.com/bvb")
                {
                    Info("[Profile] GoToTwitter - OK.");
                    Assert.Pass();
                    return this;
                }
            }
            Info("[Profile] GoToTwitter - Error.");
            Assert.Fail();

            return this;

        }
        public MainPage TicketShop()
        {
            Driver.Navigate().GoToUrl("https://www.ticket-onlineshop.com/ols/bvb/en/home/channel/shop/index/");
            Info("[TicketShop] TicketShop - Opened.");
            Thread.Sleep(5000);
            if (Driver.FindElement(emptyMessageLocator).Displayed)
            {
                Info("[MainPage] emptyMessageLocator - Founded.");
                Assert.Pass();
                return this;
            }
            else
            {
                Info("[MainPage] emptyMessageLocator - FAILED.");
                Assert.Fail();
                return this;
            }
          
        }


        public MainPage Open()
        {

            Driver.Navigate().GoToUrl(_baseUrl);
            Info("[MainPage] Main page opened.");
            Thread.Sleep(5000);
            return this;
        }
        public MainPage CloseButton()
        {
            Thread.Sleep(2000);
            Driver.FindElement(CloseButtonLocator).Click();
            //Driver.Navigate().GoToUrl("http://www.bvbonlineshop.com/");
            Info("[MainPage] closeButton.");
            return this;

        }
        public MainPage CrossCloseButton()
        {
            Thread.Sleep(2000);
            Driver.FindElement(crossColseButtonLocator).Click();
            Info("[SecondPage] closeButton.");
            return this;

        }
        public MainPage filterButton()
        {
            Thread.Sleep(2000);
            Driver.FindElement(filterButtonLocator).Click();

            Info("[SecondPage] filter   Button.");
            return this;

        }
        public MainPage filterReadyButton()
        {
            Thread.Sleep(2000);
            Driver.FindElement(filterReadyButtonLocalor).Click();
            Info("[SecondPage] filterReadyButton.");
            Thread.Sleep(8000);
            return this;

        }
        public MainPage findButton()
        {
            Driver.FindElement(findButtonLocator).Click();
            Info("[SecondPage] findButton.");
            
            return this;

        }
        

        public MainPage ClickSale()
        {
            Thread.Sleep(2000);
            Driver.FindElement(saleButtonLocator).Click();
            Info("[SecondPage] ClickSale.");
            return this;
        }


        public MainPage acceptAll()
        {
            // Используем Actions для эмуляции нажатия клавиши "Tab" на странице
            Actions actions = new Actions(Driver);
            actions.SendKeys(Keys.Tab).Perform();
            // Эмулируем нажатие клавиши "Enter" на целевом элементе
            Thread.Sleep(2000);
            actions.SendKeys(Keys.Enter).Perform();

            Info("[MainPage] acceptAll.");
            Thread.Sleep(1000);
            return this;

        }

        public MainPage GoToShop()
        {

            Driver.FindElement(ButtonShopLocator).Click();
            Info("[MainPage] submitLogin.");
            Thread.Sleep(5000);
            string originalWindowHandle = Driver.CurrentWindowHandle;
            // Переключаемся на новую вкладку
            foreach (string windowHandle in Driver.WindowHandles)
            {
                if (windowHandle != originalWindowHandle)
                {
                    Driver.SwitchTo().Window(windowHandle);
                    break;
                }
            }

            return this;
        }

        public MainPage FindText()
        {
            Driver.FindElement(findByTextLocator).Click();
            Info("[MainPage] findByTextLocator.");
            Thread.Sleep(2000);
            Driver.FindElement(TextHolderLocator).SendKeys("Nike");
            Info("[MainPage] TextHolderLocator.");
            Thread.Sleep(2000);
            Driver.FindElement(findByTextLocator).Click();
            Info("[MainPage] wait reuslt.");

            if (Driver.FindElement(FindedElements).Displayed)
            {
                Info("[MainPage] FindText- PASSED.");
                Assert.Pass();
                return this;
            }
            else
            {
                Info("[MainPage] FindText- Failed.");
                Assert.Fail();
                return this;
            }

            return this;
        }

    }
}
