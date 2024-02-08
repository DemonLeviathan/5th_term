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
    public class CheckOutpage : DriverInfo.DriverInfo
    {
        public CheckOutpage(IWebDriver driver) : base(driver)
        {
        }

        private readonly string url = "https://www.bvbonlineshop.com/en/checkout/confirm";
        private readonly By iamLocator = By.CssSelector("#register_personal_customer_type");
        private readonly By salutationLocator = By.CssSelector("#salutation");

        private readonly By firstnameLocator = By.CssSelector("#firstname");
        private readonly By lastnameLocator = By.CssSelector("#lastname");

        private readonly By noAccCheckBoxLocator =
            By.CssSelector("#register--form > div.panel.register--personal > div > div.register--check > label");

        private readonly By emailLocator = By.CssSelector("#register_personal_email");
        private readonly By phoneLocator = By.CssSelector("#phone");
        private readonly By streetLocator = By.CssSelector("#street");
        private readonly By zipCodeLocator = By.CssSelector("#zipcode");
        private readonly By cityLocator = By.CssSelector("#city");
        private readonly By contineLocator = By.CssSelector("#register--form > div.register--action > button");

        private readonly By readPrivacyLocator =
            By.CssSelector(
                "#confirm--form > div.tos--panel.panel.has--border > div.panel--body.is--wide > ul > li > span.block.column--label > label");
        public CheckOutpage CheckPaymentPage()
        {
            foreach (string handle in Driver.WindowHandles)
            {
                Driver.SwitchTo().Window(handle);
                string currentUrl = Driver.Url;
                if (currentUrl == "https://www.bvbonlineshop.com/en/checkout/shippingPayment")
                {
                    Info("[Profile] CheckPaymentPage - OK.");
                    Assert.Pass();
                    return this;
                }
            }

            Info("[Profile] CheckPaymentPage - Error.");
            Assert.Fail();
            return this;
        }
        public CheckOutpage SetLastName()
        {
            Driver.FindElement(lastnameLocator).SendKeys("LastName");
            Info("[CheckOutpage] SetLastName");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage SetName()
        {
            Driver.FindElement(firstnameLocator).SendKeys("FirstName");
            Info("[CheckOutpage] SetName");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage SetCity()
        {
            Driver.FindElement(cityLocator).SendKeys("Luxemburg");
            Info("[CheckOutpage] SetCity");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage SetZipCode()
        {
            Driver.FindElement(zipCodeLocator).SendKeys("0000");
            Info("[CheckOutpage] SetZipCode");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage SetStreet()
        {
            Driver.FindElement(streetLocator).SendKeys("America");
            Info("[CheckOutpage] SetStreet");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage SetPhone()
        {
            Driver.FindElement(phoneLocator).SendKeys("00000000");
            Info("[CheckOutpage] SetPhone");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage SetMail()
        {
            Driver.FindElement(emailLocator).SendKeys("mymail@gmail.com");
            Info("[CheckOutpage] SetMail");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage DontCreateAcc()
        {
            Driver.FindElement(noAccCheckBoxLocator).Click();
            Info("[CheckOutpage] iamLocator");
            Thread.Sleep(2000);
            return this;
        }

        public CheckOutpage ChooseMe()
        {
            var Element = new SelectElement(Driver.FindElement(iamLocator));
            Thread.Sleep(2000);
            Element.SelectByText("Private customer");
            Info("[CheckOutpage] iamLocator");

            return this;
        }

        public CheckOutpage ChooseSalutation()
        {
            //Выбрать в выпдающем меню
            var Element = new SelectElement(Driver.FindElement(salutationLocator));
            Thread.Sleep(2000);
            Element.SelectByText("Mr");
            Info("[CheckOutpage] ChooseSalutation");
            return this;
        }

        public CheckOutpage GoToCheckOutpage()
        {
            Driver.Navigate().GoToUrl(url);
            Info("[CheckOutpage] GoToCheckOutpage");
            Thread.Sleep(4000);
            return this;
        }
        public CheckOutpage ContinePay()
        {
            Driver.FindElement(contineLocator).Click();
            Info("[CheckOutpage] ContinePay");
            Thread.Sleep(2000);
            return this;
        }
        public CheckOutpage AcceptPolicy()
        {
            Driver.FindElement(readPrivacyLocator).Click();
            Info("[CheckOutpage] AcceptPolicy");
            Thread.Sleep(2000);
            return this;
        }
        
    }
}