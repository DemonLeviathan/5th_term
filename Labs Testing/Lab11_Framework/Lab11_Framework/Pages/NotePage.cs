using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Lab11_Framework.Log.Log;

namespace Lab11_Framework.Pages
{
    public class NotePage : DriverInfo.DriverInfo
    {
        public NotePage(IWebDriver driver) : base(driver)
        {
        }
    }
}
