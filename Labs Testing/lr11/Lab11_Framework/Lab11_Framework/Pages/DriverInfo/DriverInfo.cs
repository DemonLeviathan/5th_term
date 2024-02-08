using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab11_Framework.Pages.DriverInfo
{
    public class DriverInfo
    {
        protected IWebDriver Driver;

        public DriverInfo(IWebDriver driver)
        {
            this.Driver = driver;
        }
    }
}
