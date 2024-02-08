using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Lab11_Framework.Log.Log;

namespace Lab11_Framework.Pages
{
    internal class ShopPage : DriverInfo.DriverInfo
    {
        public ShopPage(IWebDriver driver) : base(driver)
        {
        }

        private readonly string shop_url = "https://www.bvbonlineshop.com/";
        private readonly string favourite = "https://www.bvbonlineshop.com/en/note";

        private readonly By itemLocator =
            By.CssSelector(
                "body > div.page-wrap > section > div > div > div > div > div:nth-child(2) > section > div.emotion--row.row--1 > div > div > div > div > div:nth-child(3) > div > div > div.product--info > a > span > span > picture > img");

        private readonly By addToCartLocator =
            By.CssSelector(
                "body > div.page-wrap > section > div > div.content--wrapper > div.content.product--details > div.product--detail-upper.block-group > div.product--buybox.block > div > form > div > button");

        private readonly By vievCardLocator =
            By.CssSelector(
                "body > div.js--modal.sizing--content.no--header > div.content > div > div.modal--actions > a.link--confirm.btn.is--primary.right.is--icon-right.is--large");

        private readonly By itemInCart =
            By.CssSelector(
                "body > div.page-wrap > section > div > div > div > div > div.panel.has--border > div > div.table--tr.block-group.row--product > div.column--product > div.panel--td.table--content > a");

        private readonly By addToFavouriteLocator =
            By.CssSelector(
                "body > div.page-wrap > section > div > div.content--wrapper > div.content.product--details > div.product--detail-upper.block-group > div.product--buybox.block > div > nav > form > button");
        
        private readonly By itemInfavourite = 
            By.CssSelector("body > div.page-wrap > section > div > div > div > div.note--overview > div > div > div.note--info.panel--td > div.note--details > a");


        //Проверка языка
        private readonly By languageLocator =
      By.CssSelector("body > div.page-wrap > header > div.top-bar > div > nav > div.navigation--entry.entry--language");

        //Проверка языка
        private readonly By FranceLocator =
      By.CssSelector("#language-modal > div > ul > li:nth-child(1) > ul > li:nth-child(2)");

        private readonly string fr_ulr = "https://www.bvbonlineshop.com/fr/";



        public ShopPage CheckLanguage()
        {
            Thread.Sleep(2000);
            foreach (string handle in Driver.WindowHandles)
            {
                Driver.SwitchTo().Window(handle);
                string currentUrl = Driver.Url;
                if (currentUrl == fr_ulr)
                {
                    Info("[Profile] CheckLanguage - OK.");
                    Assert.Pass();
                    return this;
                }
            }
            Info("[Profile] CheckLanguage - Error.");
            Assert.Fail();

            return this;
        }
        public ShopPage ChooseLanguage()
        {
            Thread.Sleep(2000);
            Driver.FindElement(FranceLocator).Click();
            Info("[ShopPage] ChooseLanguage.");

            return this;

        }

        public ShopPage LanguageMenu()
        {
            Thread.Sleep(2000);
            Driver.FindElement(languageLocator).Click();
            Info("[ShopPage] LanguageMenu.");

            return this;

        }




        /*
        public ShopPage asdadasd()
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

        }*/

        public ShopPage CheckCart()
        {
            if (Driver.FindElement(itemInCart).Displayed)
            {
                 Info("[ShopPage] Add to cart - PASSED.");
                 Assert.Pass();
                 return this;
            }
            else
            {
                Info("[ShopPage] Add to cart -FAIL.");
                Assert.Fail();
                return this;
            }
        }
        public ShopPage ChooseItem()
        {
            Thread.Sleep(2000);
            Driver.FindElement(itemLocator).Click();
            Info("[ShopPage] ChooseItem.");
            Thread.Sleep(4000);
            Driver.FindElement(addToCartLocator).Click();
            Info("[ShopPage] Add to cart.");
            Thread.Sleep(10000);
            Driver.FindElement(vievCardLocator).Click();
            Info("[ShopPage] Go to cart.");
            Thread.Sleep(10000);
            /*
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
            Assert.Fail();*/

            return this;

        }
        public ShopPage ChooseItem2()
        {
            Thread.Sleep(2000);
            Driver.FindElement(itemLocator).Click();
            Info("[ShopPage] ChooseItem.");
    
            return this;

        }

        public ShopPage AddToFavourite()
        {
            Driver.FindElement(addToFavouriteLocator).Click();
            Info("[ShopPage] AddToFavourite");
            return this;

        }

        public ShopPage Checkfavourite()
        {
            Driver.Navigate().GoToUrl(favourite);
            Thread.Sleep(5000);
            if (Driver.FindElement(itemInfavourite).Displayed)
            {
                Info("[ShopPage] Checkfavourite - PASSED");
                Assert.Pass();
                return this;
            }
            else
            {
                Info("[ShopPage] Checkfavourite - FAILED");
                Assert.Fail();
                return this;
            }

        }

        public ShopPage GoToShop()
        {
            Thread.Sleep(4000);
            Driver.Navigate().GoToUrl(shop_url);
            Info("[TicketShop] GoToShop");
            Thread.Sleep(20000);
            return this;


        }
    }
}
