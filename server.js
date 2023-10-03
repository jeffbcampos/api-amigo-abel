const path = require('path');
const MailProvider = require('./classMailProvider');
express = require('express');

const app = express();
app.use(require('cors')());
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

app.post('/send', (req, res, next) => {
    const data = {...req.body};
    console.log(data);
    const mailProvider = new MailProvider();
    mailProvider.sendMail({
        from: `${process.env.EMAIL}`,
        to: `${data.email}`,
        subject: `OPERADOR: ${data.name_operator}`,
        html: `
        <h1>Delta Capital - Formulário</h1>
        <p>
        <strong>FORMULÁRIO ID:</strong> <span>${data.form_id}</span>
        </p>
        
        <p>Segue abaixo os dados do formulário.</p>
        
        <table style="border-collapse: collapse;" border=1>
        <colgroup>
          <col style="width: 50%;"><col style="width: 50%;">
        </colgroup>
        
        <tbody>
        <tr>
        <th colspan=2 style="font-size: 24px; background-color: #e9e9e9;">
        CDC VEÍCULOS - DELTA CAPITAL
        </th>
        </tr>
        
        <tr>
        <td colspan=2>&nbsp;</td>
        </tr>
        <tr>
        <th colspan=2 style="background-color: #e9e9e9;">
        ORIGINAÇÃO
        </th>
        </tr>
        
        <tr>
        <th align="start" style="padding: .5em;">QUEM EST&Aacute; ENVIANDO O CADASTRO</th>
        <td>${data.user}</td>
        </tr>
        <tr>
        ${ data.user !== 'Cliente' ? `
            <th align="start" style="padding: .5em;">NOME DA LOJA</th>
            <td>${data.name_store}</td>
            </tr>
            <tr>
            <th align="start" style="padding: .5em;">TELEFONE DA LOJA</th>
            <td>${data.phone_store}</td>
            </tr>
        ` : ""}
        <tr>
        <th align="start" style="padding: .5em;">OPERADOR</th>
        <td>${data.name_operator}</td>
        </tr>
        
        <tr>
        <td colspan=2>&nbsp;</td>
        </tr>
        <tr>
        <th colspan=2 style="background-color: #e9e9e9;">DADOS DO PROPONENTE</th>
        </tr>
        
        <tr>
        <th align="start" style="padding: .5em;">HABILITADO</th>
        <td>${data.able}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">CPF</th>
        <td>${data.cpf}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">NOME</th>
        <td>${data.name}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">DATA DE NASCIMENTO</th>
        <td>${data.date}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">RG</th>
        <td>${data.rg}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">FILIAÇÃO - Nome da Mãe </th>
        <td>${data.affiliation}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">CEP</th>
        <td>${data.cep}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">RUA</th>
        <td>${data.logradouro}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">N°</th>
        <td>${data.number}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">BAIRRO</th>
        <td>${data.bairro}</td>
        </tr>
        ${ data.complemento ? `
        <tr>
        <th align="start" style="padding: .5em;">COMPLEMENTO</th>
        <td>${data.complemento}</td>
        </tr>
        ` : ""}
        <tr>
        <th align="start" style="padding: .5em;">CIDADE</th>
        <td>${data.localidade}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">CELULAR CLIENTE</th>
        <td>${data.phone}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">EMAIL CLIENTE</th>
        <td>${data.email}</td>
        </tr>
        
        <tr>
        <td colspan=2>&nbsp;</td>
        </tr>
        <tr>
        <th colspan=2 style="background-color: #e9e9e9;">ATIVIDADE PROFISSIONAL</th>
        </tr>
        
        
        <tr>
        <th align="start" style="padding: .5em;">ATIVIDADE PROFISSIONAL</th>
        <td>${data.professional}</td>
        </tr>
        <tr>
        <td colspan=2>&nbsp;</td>
        </tr>
        
        ${ data.professional == 'Empresário(a)' ? `
            <tr>
            <th align="start" style="padding: .5em;">CNPJ DA EMPRESA</th>
            <td>${data.cnpj_company_manager}</td>
            </tr>
            <tr>
            <th align="start" style="padding: .5em;">RENDA</th>
            <td>R$ ${data.income}</td>
            </tr>
            <tr>
            <td colspan=2>&nbsp;</td>
            </tr>
        ` : ""}
        
        ${ (data.professional == 'Assalariado' || data.professional == 'Funcionário(a) Público') ? `
            <tr>
            <th align="start" style="padding: .5em;">NOME DA EMPRESA</th>
            <td>${data.name_company}</td>
            </tr>
            <tr>
            <th align="start" style="padding: .5em;">ENDEREÇO DA EMPRESA</th>
            <td>${data.adress_company}</td>
            </tr>
            <tr>
            <th align="start" style="padding: .5em;">TELEFONE DA EMPRESA</th>
            <td>${data.contact_company}</td>
            </tr>
            <tr>
            <td colspan=2>&nbsp;</td>
            </tr>
        ` : ""}
        
        ${ data.professional == 'Autônomo' ? `
            <tr>
            <th align="start" style="padding: .5em;">TRABALHA COM O QUE?</th>
            <td>${data.independent_job}</td>
            </tr>
            <tr>
            <td colspan=2>&nbsp;</td>
            </tr>
        ` : ""}
        
        ${ data.professional == 'Profissional Liberal' ? `
            <th align="start" style="padding: .5em;">PROFISSIONAL LIBERAL</th>
            <td>${data.profession}</td>
            </tr>
            <tr>
            ${ data.profession == 'Outros Profissionais Liberais' ? `
            <th align="start" style="padding: .5em;">OUTRA AREA PROFISSIONAL</th>
            <td>${data.outher_area}</td>
            </tr>
            ` : ""}
            <tr>
            <td colspan=2>&nbsp;</td>
            </tr>
        ` : ""}
        
        <tr>
        <th colspan=2 style="background-color: #e9e9e9;">DADOS DO VEÍCULO</th>
        </tr>
        
        <tr>
        <th align="start" style="padding: .5em;">DADOS DO VEÍCULO</th>
        <td>${data.vehicle}</td>
        </tr>
        
        ${ data.vehicle == 'Veículo Usado' ? `
            <tr>
            <th align="start" style="padding: .5em;">PLACA</th>
            <td>${data.license_plate}</td>
            </tr>
        ` : ""}   
        <tr>
        <td colspan=2>&nbsp;</td>
        </tr>
        
        <tr>
        <th align="start" style="padding: .5em;">ANO DE FABRICAÇÃO</th>
        <td>${data.year_manufacture}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">ANO DO MODELO</th>
        <td>${data.year_model}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">MARCA DO VEÍCULO</th>
        <td>${data.vehicle_brand}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">MODELO DO VEÍCULO</th>
        <td>${data.model_vehicle}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">VERSÃO DO VEÍCULO</th>
        <td>${data.version_vehicle}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">MOTOR</th>
        <td>${data.motor}</td>
        </tr>
        ${ data.outher_engine ? `
            <tr>
            <th align="start" style="padding: .5em;">OUTRA MOTORIZAÇÃO</th>
            <td>${data.outher_engine}</td>
            </tr>
        ` : ""}
        <tr>
        <th align="start" style="padding: .5em;">COMBUSTÍVEL</th>
        <td>${data.fuel}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">CÂMBIO DO VEÍCULO</th>
        <td>${data.exchange}</td>
        </tr>
        
        <tr>
        <td colspan=2>&nbsp;</td>
        </tr>

        <tr>
        <th colspan=2 style="background-color: #e9e9e9;">DADOS DA OPERAÇÃO</th>
        </tr>
        
        <tr>
        <th align="start" style="padding: .5em;">VALOR DO VEÍCULO</th>
        <td>R$ ${data.vehicle_value}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">VALOR DE ENTRADA</th>
        <td>R$ ${data.input_value}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">VALOR DO FINANCIAMENTO</th>
        <td>R$ ${data.amount_financed}</td>
        </tr>
        <tr>
        <th align="start" style="padding: .5em;">PRAZO PRETENDIDO</th>
        <td>${data.deadline}</td>
        </tr>
        ${ data.outher_deadline ? `
            <tr>
            <th align="start" style="padding: .5em;">OUTRO PRAZO</th>
            <td>${data.outher_deadline}</td>
            </tr>
        ` : ""}
        <tr>
        <td colspan=2>&nbsp;</td>
        </tr>

        ${ data.message_client ? `
        <tr>
        <th colspan=2 style="background-color: #e9e9e9;">MENSAGEM DO CLIENTE</th>
        </tr>
        <tr>
        <td colspan=2 align=center >${data.message_client}</td>
        </tr>
        ` : ""}
        
        </tbody>
        </table>
        `
    });
    res.sendStatus(200);
})

app.listen(3000, () => {
    console.log('start');
});