import React, { useEffect, useState } from "react";
import "./Calculator.css";
import Range from "./Range";
import { FaIndianRupeeSign } from "react-icons/fa6";
import img from "../assets/img.jpg";

function Calculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestAmount, setInterestAmount] = useState("");
  const [payableAmount, setPayableAmount] = useState("");
  const [emi, setEmi] = useState("");
  const [minLoan, setMinLoan] = useState(0);
  const [maxLoan, setMaxLoan] = useState(10000000);
  const [tenureType, setTenureType] = useState("years");

  useEffect(() => {
    const loan = parseFloat(loanAmount);
    const rate = parseFloat(interest);
    const months =
      tenureType === "years" ? parseInt(tenure) * 12 : parseInt(tenure);

    if (
      !isNaN(loan) &&
      !isNaN(rate) &&
      !isNaN(months) &&
      rate > 0 &&
      months > 0
    ) {
      const monthlyRate = rate / 12 / 100;
      const raise = Math.pow(1 + monthlyRate, months);
      const emi = (loan * monthlyRate * raise) / (raise - 1);

      const totalPayable = emi * months;
      const interestAmount = totalPayable - loan;

      setInterestAmount(interestAmount.toFixed(2));
      setPayableAmount(totalPayable.toFixed(2));
      setEmi(emi.toFixed(2));
    }
  }, [loanAmount, interest, tenure, tenureType]);

  const handleLoanRangeChange = (amount) => {
    setLoanAmount("");
    if (amount === 10000000) {
      setMinLoan(0);
      setMaxLoan(10000000);
    } else if (amount === 50000000) {
      setLoanAmount(10000000);
      setMinLoan(10000000);
      setMaxLoan(30000000);
    } else if (amount === 300000000) {
      setLoanAmount(50000000);
      setMinLoan(30000000);
      setMaxLoan(300000000);
    }
  };

  const toggleTenureType = () => {
    setTenureType((prevType) => (prevType === "years" ? "months" : "years"));
    setTenure("");
  };

  return (
    <section>
      <div className="container">
        <div className="card1">
          <div className="selection">
            <p>Select the loan amount range</p>
            <div className="radio">
              <input
                type="radio"
                name="Section"
                id="0-1cr"
                defaultChecked
                onChange={() => handleLoanRangeChange(10000000)}
              />
              <label htmlFor="0-1cr">0-1 Crore</label>
              <input
                type="radio"
                name="Section"
                id="1-5cr"
                onChange={() => handleLoanRangeChange(50000000)}
              />
              <label htmlFor="1-5cr">1-5 Crore</label>
              <input
                type="radio"
                name="Section"
                id="5-30cr"
                onChange={() => handleLoanRangeChange(300000000)}
              />
              <label htmlFor="5-30cr">5-30 Crore</label>
            </div>
          </div>
          <div className="range">
            <p>Loan Amount</p>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              min={minLoan}
              max={maxLoan}
              placeholder="Rs"
            />
            <Range
              value={loanAmount}
              onChange={setLoanAmount}
              min={minLoan}
              max={maxLoan}
            />
          </div>
          <div className="interest">
            <p>Illustrative Interest Rate p.a.</p>
            <input
              type="number"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="%"
            />
            <Range
              value={interest}
              onChange={setInterest}
              min={0}
              max={20}
              step={0.1}
            />
          </div>
          <div className="tenure">
            <p>Tenure</p>
            <div className="toggle-button">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={tenureType === "months"}
                  onChange={toggleTenureType}
                />
                <span className="slider"></span>
              </label>
              <span>{tenureType === "years" ? "Years" : "Months"}</span>
            </div>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              min={tenureType === "months" ? 12 : 1}
              placeholder={tenureType === "months" ? "Months" : "Years"}
            />
            <Range
              value={tenure}
              onChange={setTenure}
              min={tenureType === "months" ? 12 : 1}
              max={tenureType === "months" ? 720 : 60}
            />
          </div>
        </div>
        <div className="card2">
          <div className="right">
            <h4>
              "Making financial solutions accessible, so you can focus on what
              matters most."
            </h4>
            <img src={img} alt="" />
          </div>
          <div className="left">
            <h4>Principal Amount</h4>
            <p>
              <FaIndianRupeeSign />
              {loanAmount}
            </p>
            <h4>Interest Amount</h4>
            <p>
              <FaIndianRupeeSign />
              {interestAmount}
            </p>
            <h4>Payable Amount</h4>
            <p>
              <FaIndianRupeeSign />
              {payableAmount}
            </p>
            <h3>
              Your Monthly EMI is <br />
              <span>
                <FaIndianRupeeSign />
                {emi}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
