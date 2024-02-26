"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';

function TransactionsPage() {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loader, setLoader] = useState(true);
  const session = useSession();
  const account = localStorage.getItem("account");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/belvo/accounts/detail/transactions', {
          method: 'POST',
          body: JSON.stringify({
            "link": session.data.accessToken,
            "account": account
          }),
        });
        const data = await response.json()
        setData(data);
      } catch (error) {
        alert("Error al cargar cuentas")
      } finally {
        setLoader(false)
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    calcBalance()
  }, [data])
  
  const calcBalance = () => {
    const totalInflow = data.reduce((total, transaction) => {
        if (transaction.type === 'INFLOW') {
            return total + transaction.amount;
        } else {
            return total;
        }
    }, 0);

    const totalOutflow = data.reduce((total, transaction) => {
        if (transaction.type === 'OUTFLOW') {
            return total + transaction.amount;
        } else {
            return total;
        }
    }, 0);
 
    setBalance((totalInflow - totalOutflow).toFixed(2))
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      {loader ? (
        <div className="w-full flex justify-center text-white items-center h-screen text-xl"><span>Cargando...</span></div>
      ) : (
        <>
         <div className="w-full flex justify-center text-white text-xl"><h2>Balance: ${balance}</h2></div>
          <div className="w-full flex justify-center text-white text-xl"><h2>Transacciones</h2></div>
          {data.length === 0 ? null : (
            <table className='table-auto text-left whitespace-no-wrap bg-slate-200 w-3/4'>
              <thead>
                <tr>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Tipo</th>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Monto</th>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Merchant</th>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {data.map((transaction) => (
                  <tr className='mb-1' key={transaction.id}>
                    <td className='px-4 py-3'>{transaction.type == "INFLOW" ? "Ingreso" : "Egreso"}</td>
                    <td className='px-4 py-3'>${transaction.amount}</td>
                    <td className='px-4 py-3'>{transaction.merchant.name}</td>
                    <td className='px-4 py-3'>{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}

export default TransactionsPage
