// Número do WhatsApp da barbearia (código do país 55 + DDD + número, sem espaços).
// Para trocar o número, mude só esta linha.
const NUMERO = "5549985048140";

function linkWhatsApp(mensagem) {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

// Botões de WhatsApp da página: abrem uma conversa com mensagem inicial.
document.querySelectorAll(".wa").forEach((a) => {
  a.href = linkWhatsApp("Olá! Vim pelo site e gostaria de agendar um horário.");
  a.target = "_blank";
  a.rel = "noopener";
});

// Não deixa escolher um dia que já passou.
const campoData = document.getElementById("data");
campoData.min = new Date().toISOString().split("T")[0];

// Formulário: monta a mensagem e abre o WhatsApp.
document.getElementById("form-agenda").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const servico = document.getElementById("servico").value;
  const data = campoData.value;
  const hora = document.getElementById("hora").value;
  const erro = document.getElementById("erro");

  if (!nome || !servico || !data || !hora) {
    erro.textContent = "Preencha nome, serviço, dia e horário para continuar.";
    erro.hidden = false;
    return;
  }
  erro.hidden = true;

  const [ano, mes, dia] = data.split("-");
  const mensagem =
    `Olá! Meu nome é ${nome}.\n` +
    `Gostaria de agendar: ${servico}.\n` +
    `Dia: ${dia}/${mes}/${ano} às ${hora}.\n` +
    `Esse horário está disponível?`;

  window.open(linkWhatsApp(mensagem), "_blank", "noopener");
});
