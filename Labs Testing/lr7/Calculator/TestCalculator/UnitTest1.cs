using NUnit.Framework;
using CalculatorApp;

namespace CalculatorTests
{
    [TestFixture]
    public class CalculatorTests
    {
        private Calculator calculator;

        [SetUp]
        public void Setup()
        {
            calculator = new Calculator();
        }

        [Test]
        public void TestAdd()
        {
            double result = calculator.Add(10, 5);
            Assert.That(result, Is.EqualTo(15));
        }

        [Test]
        public void TestSubtract()
        {
            double result = calculator.Subtract(10, 5);
            Assert.That(result, Is.EqualTo(5));
        }

        [Test]
        public void TestMultiply()
        {
            double result = calculator.Multiply(10, 5);
            Assert.That(result, Is.EqualTo(50));
        }

        [Test]
        public void TestDivide()
        {
            double result = calculator.Divide(10, 5);
            Assert.That(result, Is.EqualTo(2));
        }

        [Test]
        public void TestDivideByZero()
        {
            Assert.Throws<System.ArgumentException>(() => calculator.Divide(10, 0));
        }

        [Test]
        public void TestAddNegativeNumbers()
        {
            double result = calculator.Add(-10, -5);
            Assert.That(result, Is.EqualTo(-15));
        }

        [Test]
        public void TestSubtractNegativeNumbers()
        {
            double result = calculator.Subtract(-10, -5);
            Assert.That(result, Is.EqualTo(-5));
        }

        [Test]
        public void TestMultiplyByZero()
        {
            double result = calculator.Multiply(10, 0);
            Assert.That(result, Is.EqualTo(0));
        }

        [Test]
        public void TestDivideZeroByNumber()
        {
            double result = calculator.Divide(0, 5);
            Assert.That(result, Is.EqualTo(0));
        }

        [Test]
        public void TestDivideNegativeByPositive()
        {
            double result = calculator.Divide(-10, 5);
            Assert.That(result, Is.EqualTo(-2));
        }

    }
}
