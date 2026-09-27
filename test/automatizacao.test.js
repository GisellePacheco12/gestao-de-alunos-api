import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';
import testData from './data.json' assert { type: 'json' };

describe('Teste de Integração - Admin → Aluno → Entrega', () => {
  let adminToken;
  let studentToken;
  let studentId;
  let workId;

  // 1. LOGIN ADMIN
  describe('Login Admin', () => {
    it('Deve fazer login como admin', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testData.admin.email,
          password: testData.admin.password
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      adminToken = response.body.token;
    });
  });

  // 2. CADASTRAR ALUNO (Data-Driven)
  describe('Cadastrar Aluno', () => {
    testData.alunos.forEach((student, index) => {
      it(`Cadastrar um aluno ${index + 1}: ${student.nome}`, async () => {
        const response = await request(app)
          .post('/api/alunos')
          .set('Authorization', `Bearer ${adminToken}`)
          .send(student);

        expect(response.status).to.equal(201);
        expect(response.body.nome).to.equal(student.nome);
        
        if (index === 0) studentId = response.body._id;
      });
    });
  });

  // 3. LOGIN ALUNO
  describe('Login Aluno', () => {
    it('Deve realizar login como aluno', async () => {
      const student = testData.alunos[0];
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: student.email,
          password: student.password
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      studentToken = response.body.token;
    });
  });

  // 4. REGISTRAR ENTREGA (Data-Driven)
  describe('Registrar Entrega de Trabalho', () => {
    before('Criar trabalho para entrega do aluno', async () => {
      const response = await request(app)
        .post('/api/trabalhos')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testData.trabalhos[0]);

      if (response.status === 201) workId = response.body._id;
    });

    testData.entregas.forEach((delivery, index) => {
      it(`Registrar entrega do trabalho como aluno ${index + 1}: ${delivery.arquivo}`, async () => {
        if (!workId) this.skip();

        const response = await request(app)
          .post(`/api/trabalhos/${workId}/entregar`)
          .set('Authorization', `Bearer ${studentToken}`)
          .send(delivery);

        expect(response.status).to.equal(201);
        expect(response.body.arquivo).to.equal(delivery.arquivo);
      });
    });
  });
});