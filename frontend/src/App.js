import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch Expenses
  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses").then((response) => {
      setExpenses(response.data);
    });
  }, []);

  // Add Expense
  const addExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("Please enter title and amount");

    try {
      const response = await axios.post("http://localhost:5000/api/expenses", { title, amount });
      setExpenses([...expenses, response.data]); // Update state with new expense
      setTitle("");
      setAmount("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Chart Data
  const chartData = {
    labels: expenses.map((expense) => expense.title),
    datasets: [
      {
        label: "Expenses (₹)",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">💰 Personal Finance Manager</h2>

      {/* Add Expense Form */}
      <form onSubmit={addExpense} className="mt-4">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Expense Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Expense</button>
      </form>

      {/* Expense Table */}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense._id}>
              <td>{index + 1}</td>
              <td>{expense.title || "Untitled"}</td> {/* Fix: Ensure title is displayed */}
              <td>₹{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expense Chart */}
      <div className="mt-4">
        <h4 className="text-center">📊 Expense Overview</h4>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default App;
