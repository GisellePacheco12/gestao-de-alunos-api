import request from 'supertest';
import app from '../src/app.js';
import { expect } from 'chai';

describe('Login', () => {  // ← Corrigido sintaxe
    it('Deve retornar 200 quando usuário e senha forem corretos', async () => {
        const loginResposta = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: 'admin@escola.com', 
            password: 'admin123'  // ← password, não senha
        });

        expect(loginResposta.status).to.equal(200);
        expect(loginResposta.body).to.have.property('token');
    });

    it('Deve retornar 400 quando a senha não for informada', async () => {
        const loginResposta = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: 'admin@escola.com', 
            password: ''  // ← password, não senha
        });

        expect(loginResposta.status).to.equal(400);
    });

    it('Deve retornar 401 quando o usuário estiver correto mas a senha for incorreta', async () => {
        const loginResposta = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: 'admin@escola.com', 
            password: 'admin1234'  // ← password, não senha
        });

        expect(loginResposta.status).to.equal(401);
    });
});