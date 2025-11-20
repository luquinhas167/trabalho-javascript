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

// Operadora A
function planoA_basico(idade, imc) { return 100 + (idade * 10 * (imc / 10)); }
function planoA_standard(idade, imc) { return (150 + (idade * 15)) * (imc / 10); }
function planoA_premium(idade, imc) { return (200 - (imc * 10) + (idade * 20)) * (imc / 10); }

// Operadora B
function planoB_basico(f, imc) { return 100 + (f * 10 * (imc / 10)); }
function planoB_standard(f, imc) { return (150 + (f * 15)) * (imc / 10); }
function planoB_premium(f, imc) { return (200 - (imc * 10) + (f * 20)) * (imc / 10); }

let grafico = null;

function calcular() {
    let idade = Number(document.getElementById("idade").value);
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (!idade || !peso || !altura) {
        alert("Preencha todos os campos!");
        return;
    }

    let imc = calcularIMC(peso, altura);
    let f = fatorComorbidade(imc);

    let A1 = planoA_basico(idade, imc);
    let A2 = planoA_standard(idade, imc);
    let A3 = planoA_premium(idade, imc);

    let B1 = planoB_basico(f, imc);
    let B2 = planoB_standard(f, imc);
    let B3 = planoB_premium(f, imc);

    let planos = [
        { nome: "A - Básico", valor: A1 },
        { nome: "A - Standard", valor: A2 },
        { nome: "A - Premium", valor: A3 },
        { nome: "B - Básico", valor: B1 },
        { nome: "B - Standard", valor: B2 },
        { nome: "B - Premium", valor: B3 }
    ];

    let menor = planos.reduce((m, a) => (a.valor < m.valor ? a : m));

    document.getElementById("resultado").innerHTML = `
        <h3>Resultados</h3>
        <p><b>IMC:</b> ${imc.toFixed(2)}</p>
        <p><b>Fator de Comorbidade:</b> ${f}</p>

        <h3>Tabela de Preços</h3>
        <table>
            <tr><th>Plano</th><th>Preço (R$)</th></tr>
            ${planos.map(p => `<tr><td>${p.nome}</td><td>${p.valor.toFixed(2)}</td></tr>`).join("")}
        </table>

        <h2>Plano Mais Vantajoso</h2>
        <h3 style="color:#4f8df5;">${menor.nome} — R$ ${menor.valor.toFixed(2)}</h3>
    `;

    let ctx = document.getElementById("grafico");

    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: planos.map(p => p.nome),
            datasets: [{
                label: "Preço dos Planos",
                data: planos.map(p => p.valor),
                backgroundColor: ["#4f8df5", "#6aa8ff", "#8bc1ff", "#ff7676", "#ff9c9c", "#ffc1c1"]
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
}
