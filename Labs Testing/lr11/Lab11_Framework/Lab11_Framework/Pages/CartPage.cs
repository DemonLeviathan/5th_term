using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Lab11_Framework.Log.Log;

namespace Lab11_Framework.Pages
{
    public class CartPage : DriverInfo.DriverInfo
    {
        public CartPage(IWebDriver driver) : base(driver)
        {
        }

        private readonly string cart_url = "https://www.bvbonlineshop.com/en/checkout/cart";

        private readonly By itemquantity = By.CssSelector("body > div.page-wrap > section > div > div > div > div > div.panel.has--border > div > div.table--tr.block-group.row--product.is--last-row > div.panel--td.column--quantity.is--align-right > form > select");

        private readonly By deleteItemLocator =
            By.CssSelector(
                "body > div.page-wrap > section > div > div > div > div > div.panel.has--border > div > div.table--tr.block-group.row--product.is--last-row > div.panel--td.column--actions > form > button");
        private readonly By itemInCart = By.CssSelector("body > div.page-wrap > section > div > div > div > div.note--overview > div > div:nth-child(1) > div.note--info.panel--td > div.note--details > a");


        public CartPage GoToCart()
        {
            Driver.Navigate().GoToUrl(cart_url);
            Thread.Sleep(5000);
            Info("[CartPage] GoToCart");
            return this;
        }

        public CartPage ChooseQuantity()
        {
                //Выбрать в выпдающем меню
                var Element = new SelectElement(Driver.FindElement(itemquantity));
                Thread.Sleep(2000);
                Element.SelectByText("6");
                Info("[CartPage] ChooseQuantity");
                return this;
        }

        public CartPage DeleteItem()
        {
            Driver.FindElement(deleteItemLocator).Click();
            Thread.Sleep(2000);
            if (Driver.FindElement(itemInCart).Displayed)
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
    }
}
