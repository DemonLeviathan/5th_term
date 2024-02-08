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
    public class Test_3
    {

        private MainPage _mainPage;

        [SetUp]
        public void Setup()
        {
            _mainPage = new MainPage(Driver);
        }

        [Test]
        public void Test2()
        {
        
        }

        [TearDown]
        public void TearDown()
        {
        }

    }
}