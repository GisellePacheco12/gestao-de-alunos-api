import { describe, it } from 'mocha';
import { expect } from 'chai';
import testData from './data.json' assert { type: 'json' };

describe('Testes Automatizados - Data-Driven Testing', () => {
  
  // 1. VALIDAR DADOS DO ADMIN
  describe('Validar Dados do Admin', () => {
    it('Admin deve ter email e senha', () => {
      expect(testData.admin).to.have.property('email');
      expect(testData.admin).to.have.property('senha');
      expect(testData.admin.email).to.equal('admin@escola.com');
      expect(testData.admin.senha).to.equal('admin123');
    });
  });

  // 2. VALIDAR DADOS DE ALUNOS (Data-Driven)
  describe('Validar Alunos - Data-Driven Testing', () => {
    testData.alunos.forEach((aluno, index) => {
      it(`Aluno ${index + 1} (${aluno.nome}) deve ter dados válidos`, () => {
        expect(aluno).to.have.property('nome');
        expect(aluno).to.have.property('email');
        expect(aluno).to.have.property('senha');
        expect(aluno).to.have.property('matricula');
        expect(aluno).to.have.property('cpf');

        expect(aluno.nome).to.be.a('string');
        expect(aluno.email).to.be.a('string');
        expect(aluno.senha).to.be.a('string');
        expect(aluno.matricula).to.be.a('string');
        expect(aluno.cpf).to.be.a('string');
      });
    });
  });

  // 3. VALIDAR DADOS DE TRABALHOS (Data-Driven)
  describe('Validar Trabalhos - Data-Driven Testing', () => {
    testData.trabalhos.forEach((trabalho, index) => {
      it(`Trabalho ${index + 1} (${trabalho.titulo}) deve ter dados válidos`, () => {
        expect(trabalho).to.have.property('titulo');
        expect(trabalho).to.have.property('descricao');
        expect(trabalho).to.have.property('dataEntrega');

        expect(trabalho.titulo).to.be.a('string');
        expect(trabalho.descricao).to.be.a('string');
        expect(trabalho.dataEntrega).to.match(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });

  // 4. VALIDAR DADOS DE ENTREGAS (Data-Driven)
  describe('Validar Entregas - Data-Driven Testing', () => {
    testData.entregas.forEach((entrega, index) => {
      it(`Entrega ${index + 1} (${entrega.arquivo}) deve ter dados válidos`, () => {
        expect(entrega).to.have.property('arquivo');
        expect(entrega).to.have.property('observacoes');

        expect(entrega.arquivo).to.be.a('string');
        expect(entrega.observacoes).to.be.a('string');
        expect(entrega.arquivo).to.include('.pdf');
      });
    });
  });

  // 5. VALIDAR QUANTIDADE DE DADOS
  describe('Validar Quantidade de Dados', () => {
    it('Deve ter pelo menos 2 alunos', () => {
      expect(testData.alunos.length).to.be.at.least(2);
    });

    it('Deve ter pelo menos 1 trabalho', () => {
      expect(testData.trabalhos.length).to.be.at.least(1);
    });

    it('Deve ter pelo menos 1 entrega', () => {
      expect(testData.entregas.length).to.be.at.least(1);
    });
  });
});