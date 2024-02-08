using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lab11_Framework.Pages;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
using static Lab11_Framework.DriverInstance.DriverInstance;


namespace Lab11_Framework.Tests
{
    //add product to favorites and then check if it is in favorites
    [TestClass]
    public class Test_93
    {

        private ShopPage _ShopPage;

        [SetUp]
        public void Setup()
        {
            _ShopPage = new ShopPage(Driver);
        }

        [Test]
        public void Test93()
        {
            //Сделайть проверку смены языка
            _ShopPage.GoToShop();
            _ShopPage.LanguageMenu();
            _ShopPage.ChooseLanguage();
            _ShopPage.CheckLanguage();
            
            Thread.Sleep(5000);
        }

        [TearDown]
        public void TearDown()
        {
        }

    }
}