import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';
import testData from './data.json' assert { type: 'json' };

describe('Fluxo Completo - Logar como Admin, Cadastrar Aluno, Logar como Aluno, Entregar Trabalho', () => {
  let adminToken;
  let studentToken;
  let studentId;
  let workId;

  // 1. LOGAR COMO ADMINISTRADOR
  describe('1. Logar como Administrador', () => {
    it('deve fazer login como admin e obter token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testData.admin.email,
          senha: testData.admin.senha
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      adminToken = response.body.token;
      console.log('Admin logado com sucesso');
    });
  });

  // 2. CADASTRAR UM ALUNO
  describe('2. Cadastrar um Aluno', () => {
    it('admin deve cadastrar um novo aluno', async () => {
      const aluno = testData.alunos[0];
      
      const response = await request(app)
        .post('/api/alunos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(aluno);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('_id');
      studentId = response.body._id;
      console.log(`Aluno ${aluno.nome} cadastrado com sucesso`);
    });
  });

  // 3. LOGAR COMO ALUNO
  describe('3. Logar como Aluno', () => {
    it('aluno deve fazer login e obter token', async () => {
      const aluno = testData.alunos[0];
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: aluno.email,
          senha: aluno.senha
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      studentToken = response.body.token;
      console.log('Aluno logado com sucesso');
    });
  });

  // 4. REGISTRAR ENTREGA DE TRABALHO
  describe('4. Registrar Entrega de Trabalho como Aluno', () => {
    it('aluno deve entregar um trabalho', async () => {
      const entrega = testData.entregas[0];
      
      if (!workId) {
        this.skip();
      }

      const response = await request(app)
        .post(`/api/trabalhos/${workId}/entregar`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send(entrega);

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('arquivo');
      console.log(`Entrega ${entrega.arquivo} registrada com sucesso`);
    });
  });
});