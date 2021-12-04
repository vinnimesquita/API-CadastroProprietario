using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projetoTeste.Models;
 
namespace projetoTeste.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ProprietarioController : ControllerBase
    {
        private BDContexto contexto;
        
        public ProprietarioController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
        
        [HttpGet]
        public List<Proprietario> Listar()
        {
            return contexto.Proprietario.ToList();
        }

        [HttpGet]
        public List<Proprietario> FiltrarImovel(string tipoimovel)
        {
            return contexto.Proprietario.Where(c => c.Tipoimovel == tipoimovel).ToList();
                 
        }

        [HttpPost]
        public string  Cadastrar([FromBody]Proprietario dados)
        {

            contexto.Add(dados); 
            contexto.SaveChanges();

            return "Colaborador Cadastrado com sucesso";
        }

          [HttpDelete]
        public string Excluir([FromBody]int id)
        {
            Proprietario dados = contexto.Proprietario.FirstOrDefault(p => p.Id == id);

            if (dados == null)
            {
                return "Não foi encontrado Proprietario para o ID informado!";
            }
            else
            {
                contexto.Remove(dados);
                contexto.SaveChanges();
            
                return "Proprietario excluído com sucesso!";
            }
        }

        [HttpDelete]
        public string ExcluirLogico([FromBody]int id)
        {
            try
            {
                Proprietario dados = contexto.Proprietario.FirstOrDefault(p => p.Id == id);

                dados.Excluido = true;
                contexto.Update(dados);
                contexto.SaveChanges();
        
                return "Proprietario excluído com sucesso!";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet]
        public Proprietario  Visualizar(int id)
        {
           return contexto.Proprietario.Where(p => p.Id == id)
            .Select(c => new Proprietario
            {
              Id = c.Id,
              Nome = c.Nome,
              Endereco = c.Endereco,
              Telefone = c.Telefone,
              Tipoimovel = c.Tipoimovel
              
            }
            ).FirstOrDefault();
           }


        [HttpPut]
        public string Alterar([FromBody]Proprietario dados)
        {
            contexto.Update(dados);
            contexto.SaveChanges();
            
            return "Proprietario alterado com sucesso!";
        }
        
       
        }
    }
