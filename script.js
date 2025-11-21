function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function fatorComorbidade(imc) {
    if (imc < 18.5) return 10;
    if (imc < 25) return 1;
    if (imc < 30) return 6;
    if (imc < 35) return 10;
    if (imc < 40) return 20;
    return 30;
}

function calcularOperadoraA(idade, imc) {
    return {
        basico: 100 + idade * imc,
        standard: (150 + idade * 15) * (imc / 10),
        premium: (200 - (imc * 10) + idade * 20) * (imc / 10)
    };
}

function calcularOperadoraB(fator, imc) {
    return {
        basico: 100 + fator * imc,
        standard: (150 + fator * 15) * (imc / 10),
        premium: (200 - (imc * 10) + fator * 20) * (imc / 10)
    };
}

function calcular() {
    let idade = Number(document.getElementById("idade").value);
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    let imc = calcularIMC(peso, altura).toFixed(2);
    let fator = fatorComorbidade(imc);

    let A = calcularOperadoraA(idade, imc);
    let B = calcularOperadoraB(fator, imc);

    let tabela = `
        <h2>Resultado</h2>
        <p><strong>IMC:</strong> ${imc}</p>
        <p><strong>Fator de Comorbidade (B):</strong> ${fator}</p>

        <table border="1" cellpadding="8">
            <tr>
                <th>Operadora</th>
                <th>Básico</th>
                <th>Standard</th>
                <th>Premium</th>
            </tr>
            <tr>
                <td>A</td>
                <td>R$ ${A.basico.toFixed(2)}</td>
                <td>R$ ${A.standard.toFixed(2)}</td>
                <td>R$ ${A.premium.toFixed(2)}</td>
            </tr>
            <tr>
                <td>B</td>
                <td>R$ ${B.basico.toFixed(2)}</td>
                <td>R$ ${B.standard.toFixed(2)}</td>
                <td>R$ ${B.premium.toFixed(2)}</td>
            </tr>
        </table>
    `;

    document.getElementById("resultado").innerHTML = tabela;
}