"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link';

function AccountsPage() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const account = localStorage.getItem("account");
  const url = `/api/belvo/accounts/detail?account=${account}`
  useEffect(() => {
    getAccount()
  }, []);

  const getAccount = async()=>{
    try {
      const response = await fetch(url, {
        method: 'GET'
      });
      const data = await response.json()
      setData(data);
    } catch (error) {
      alert("Error al cargar el detalle de la cuenta")
    } finally {
      setLoader(false)
    }
    
  }
  return (
    <div className='flex flex-wrap justify-center text-gray-900'>
      {loader ? (
        <div className="w-full text-white flex justify-center items-center h-screen text-xl"><span>Cargando...</span></div>
      ) : (
        <div className='w-1/2 bg-slate-100 rounded text-gray-900 flex flex-wrap justify-center items-center space-y-4 p-4'>
          <div className='w-full text-center block'><h1 className='text-2xl font-bold'>{data.name}</h1></div>
          
          <div className='space-y-2 w-full px-5'>
            <p>Tipo de cuenta: {data.type}</p>
            <p>Saldo actual: {data.balance.current}</p>
            <p>Moneda: {data.currency}</p>
            <p>Identificador público: {data.public_identification_name}</p>
            <p>Terminación: {data.public_identification_value} </p>
            
          </div>
          <Link href={'/account/transactions'} className='bg-blue-600 text-white px-4 py-2 rounded mt-10'>Ver transacciones</Link>
        </div>
      )}
    </div>
  )
}

export default AccountsPage
