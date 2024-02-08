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
    public class Test_5
    {

        private CheckOutpage _CheckOutpage;

        [SetUp]
        public void Setup()
        {
            _CheckOutpage = new CheckOutpage(Driver);
        }

        [Test]
        public void Test1()
        {
            _CheckOutpage.GoToCheckOutpage();
       
            
            _CheckOutpage.ChooseMe();
            _CheckOutpage.ChooseSalutation();
            _CheckOutpage.SetName();
            _CheckOutpage.SetLastName();
            _CheckOutpage.DontCreateAcc();
            _CheckOutpage.SetMail();
            _CheckOutpage.SetPhone();
            _CheckOutpage.SetStreet();
            _CheckOutpage.SetCity();
            _CheckOutpage.SetZipCode();
            _CheckOutpage.ContinePay();
            _CheckOutpage.CheckPaymentPage();
            Thread.Sleep(5000);
        }

        [TearDown]
        public void TearDown()
        {
        }

    }
}