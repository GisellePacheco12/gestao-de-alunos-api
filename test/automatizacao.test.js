import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';
import testData from './data.json' assert { type: 'json' };

describe('Testes Automatizados - Data-Driven Testing', () => {
  
  describe('Login Admin', () => {
    it('Deve fazer login como admin', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testData.admin.email,
          senha: testData.admin.senha
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  describe('Cadastrar Aluno - Data-Driven Testing', () => {
    testData.alunos.forEach((aluno, index) => {
      it(`Deve cadastrar aluno ${index + 1}: ${aluno.nome}`, async () => {
        // Primeiro faz login como admin
        const loginRes = await request(app)
          .post('/api/auth/login')
          .send({
            email: testData.admin.email,
            senha: testData.admin.senha
          });

        expect(loginRes.status).to.equal(200);
        const adminToken = loginRes.body.token;

        // Depois cadastra o aluno
        const response = await request(app)
          .post('/api/alunos')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(aluno);

        expect(response.status).to.equal(201);
        expect(response.body.nome).to.equal(aluno.nome);
        expect(response.body.email).to.equal(aluno.email);
      });
    });
  });

  // 3. REGISTRAR ENTREGA (Data-Driven)
  describe('Registrar Entrega - Data-Driven Testing', () => {
    testData.entregas.forEach((entrega, index) => {
      it(`Deve validar entrega ${index + 1}: ${entrega.arquivo}`, async () => {
        expect(entrega).to.have.property('arquivo');
        expect(entrega).to.have.property('observacoes');
        expect(entrega.arquivo).to.be.a('string');
        expect(entrega.observacoes).to.be.a('string');
      });
    });
  });
});