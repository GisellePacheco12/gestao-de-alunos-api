import request from 'supertest';
import app from '../src/app.js';

/**
 * Helper para fazer login como Administrador
 * @returns {Promise<string>} Token JWT do admin
 */
export async function loginAsAdmin() {
  const response = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'admin@escola.com',
      password: 'admin123'
    });

  if (response.status !== 200) {
    throw new Error(`Erro ao fazer login como admin: ${response.body.message}`);
  }

  return response.body.token;
}

/**
 * Helper para fazer login como Usuário (Aluno)
 * @param {string} email Email do usuário
 * @param {string} password Senha do usuário
 * @returns {Promise<string>} Token JWT do usuário
 */
export async function loginAsUser(email, password) {
  const response = await request(app)
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send({
      email,
      password
    });

  if (response.status !== 200) {
    throw new Error(`Erro ao fazer login como usuário: ${response.body.message}`);
  }

  return response.body.token;
}

/**
 * Helper para cadastrar um aluno
 * @param {object} studentData Dados do aluno
 * @param {string} adminToken Token do admin
 * @returns {Promise<object>} Resposta com dados do aluno criado
 */
export async function registerStudent(studentData, adminToken) {
  const response = await request(app)
    .post('/api/alunos')
    .set('Authorization', `Bearer ${adminToken}`)
    .set('Content-Type', 'application/json')
    .send(studentData);

  if (response.status !== 201) {
    throw new Error(`Erro ao cadastrar aluno: ${response.body.message}`);
  }

  return response.body;
}

/**
 * Helper para registrar entrega de trabalho
 * @param {string} workId ID do trabalho
 * @param {object} deliveryData Dados da entrega
 * @param {string} userToken Token do usuário
 * @returns {Promise<object>} Resposta com dados da entrega
 */
export async function submitWork(workId, deliveryData, userToken) {
  const response = await request(app)
    .post(`/api/trabalhos/${workId}/entregar`)
    .set('Authorization', `Bearer ${userToken}`)
    .set('Content-Type', 'application/json')
    .send(deliveryData);

  if (response.status !== 201) {
    throw new Error(`Erro ao registrar entrega: ${response.body.message}`);
  }

  return response.body;
}