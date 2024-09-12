import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

function FinancialCalculator({ carDetail }) {
  const [carPrice, setCarPrice] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const CalculateMonthlyPayment = () => {
    const Principal = carPrice - downPayment;
    const MonthlyInterestRate = interestRate / 1200; // to decimal
    const MonthlyPayment =
      (Principal *
        MonthlyInterestRate *
        Math.pow(1 + MonthlyInterestRate, loanTerm)) /
      (Math.pow(1 + MonthlyInterestRate, loanTerm) - 1);
    // console.log(MonthlyPayment.toFixed(2));
    setMonthlyPayment(MonthlyPayment.toFixed(2));
  };
  console.log(monthlyPayment);

  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      <h2 className="font-medium text-2xl">Financial Calculator</h2>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label htmlFor="">Price $</label>
          <Input type="number" onChange={(e) => setCarPrice(e.target.value)} />
        </div>
        <div className="w-full">
          <label htmlFor="">Interest Rate (%)</label>
          <Input
            type="number"
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label htmlFor="">Loan Term (Months)</label>
          <Input type="number" onChange={(e) => setLoanTerm(e.target.value)} />
        </div>
        <div className="w-full">
          <label htmlFor="">Down Payment</label>
          <Input
            type="number"
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>
      </div>
      {monthlyPayment > 0 && (
        <h2 className="mt-5 font-medium text-2xl">
          Your Monthly Payment is:
          <span className="text-4xl font-bold text-green-500">
            {" "}
            ${monthlyPayment}
          </span>
        </h2>
      )}

      <Button
        className="w-full mt-5"
        size="lg"
        onClick={CalculateMonthlyPayment}
      >
        Calulate
      </Button>
    </div>
  );
}

export default FinancialCalculator;
