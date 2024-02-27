"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function HomePage() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/belvo/accounts', {
          method: 'POST',
          body: JSON.stringify({
            "link": session.data.accessToken,
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
    if (!session?.data) {
      redirect('/auth/login');
    }
  }, [])
  
  const selectAccount = (id)=> {
    localStorage.setItem("account", id)
  }
  
  return (
    <div className='flex flex-wrap justify-center'>
      {loader ? (
        <div className="w-full text-slate-300 flex justify-center text-xl"><span>Cargando...</span></div>
      ) : (
        <>
          <div className="w-full text-slate-300 flex justify-center text-xl"><h2>Selecciona el banco / cuenta que quieras revisar</h2></div>
          {data.length === 0 ? null : (
            data.map((account) => (
              <Link
              onClick={selectAccount(account.id)}
                href={'/account'}
                className='m-2 p-4 bg-gray-300 rounded shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'
                key={account.id}
              >
                  <h3 className='text-xl font-bold mb-2'>Banco: {account?.institution?.name && 'Erebor Bank'}</h3>
                  <p className='mb-2'>Tipo de cuenta: {account.type}</p>
                  <p>Nombre del servicio: {account.name}</p>
              </Link>
            ))
          )}
        </>
      )}
    </div>

  )
}

export default HomePage