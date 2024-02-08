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
                "body > div.page-wrap > section > div > div > div > div > div:nth-child(2) > section > div.emotion--row.row--1 > div > div > div > div > div:nth-child(3) > div > div > div.product--info > div > a");

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
                "body > div.page-wrap > section > div > div.content--wrapper > div.content.product--details > div.product--detail-upper.block-group > div.product--buybox.block > div > nav > form > button > span");
        
        private readonly By itemInfavourite = By.CssSelector("body > div.page-wrap > section > div > div > div > div.note--overview > div > div:nth-child(1) > div.note--info.panel--td > div.note--details > a");




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
            Driver.Navigate().GoToUrl(shop_url);
            Info("[TicketShop] GoToShop");
            Thread.Sleep(4000);
            return this;


        }
    }
}
