using System;
using System.Collections.Generic;

namespace projetoTeste.Models
{
    public partial class Proprietario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
        public string Tipoimovel { get; set; }
        public bool Excluido { get; set; }
    }
}
