using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace projetoTeste.Models
{
    public partial class BDCntexto : DbContext
    {
        public BDCntexto()
        {
        }

        public BDCntexto(DbContextOptions<BDCntexto> options)
            : base(options)
        {
        }

        public virtual DbSet<Proprietario> Proprietario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=sua_senha;database=seu_banco");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proprietario>(entity =>
            {
                entity.ToTable("proprietario");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Endereco)
                    .IsRequired()
                    .HasColumnName("endereco")
                    .HasMaxLength(100);

                entity.Property(e => e.Excluido).HasColumnName("excluido");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(100);

                entity.Property(e => e.Telefone)
                    .IsRequired()
                    .HasColumnName("telefone")
                    .HasMaxLength(20);

                entity.Property(e => e.Tipoimovel)
                    .IsRequired()
                    .HasColumnName("tipoimovel")
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
