import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function EditIncident() {

   // const [incidents, setIncidents] = useState({});

   const id = localStorage.getItem('idIncident');
   

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [value, setValue] = useState('');
   const [ong_id, setOngId] = useState('');

   const history = useHistory();

   async function handleEditIncident(e) {

      e.preventDefault();

      const data = {
         title,
         description,
         value,
         ong_id
      };

      try {
         await api.put(`incidents/${id}`, data).then(res => (res.data));
         history.push('/profile');
      } catch (err) {
         console.log('Deu ruim');
         
      }    
   }

   return (
      <div className="edit-incident-container">
         <div className="content">
            <section>
               <img src={logoImg} alt="Be The Hero" />

               <h1>Editar Caso</h1>
               <p>Caso tenha errado alguma informação, a hora de ajeitar é agora =D.</p>

               <Link className="back-link" to="/profile">
                  <FiArrowLeft size={16} />
                  Voltar para home
               </Link>
            </section>

            <form onSubmit={handleEditIncident}>
               <input
                  placeholder="Título do caso"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
               />
               <textarea
                  placeholder="Descrição"
               value={description}
               onChange={e => setDescription(e.target.value)}
               />
               <input
                  placeholder="Valor em reais"
               value={value}
               onChange={e => setValue(e.target.value)}
               />
               <input
                  placeholder="Digite seu id"
               value={ong_id}
               onChange={e => setOngId(e.target.value)}
               />

               <button className="button" type="submit">Editar</button>
            </form>
         </div>
      </div>
   );
};