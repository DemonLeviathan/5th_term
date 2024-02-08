using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab11_Framework.Log
{
    internal static class Log
    {
        public static void Info(string message)
        {
            using (var sw = new System.IO.StreamWriter("../../../../log.txt", true))
            {
                sw.WriteLine($"{DateTime.Now} [INFO] {message}");
            }
        }
    }
}
