# Textos dos anúncios e roteiro de triagem do WhatsApp

Status: rascunho para aprovação. Nada foi publicado.
Pendente em todas as peças: nome do advogado responsável e número de inscrição na OAB (Provimento 205/2021) [INFORMAR].

## Vídeos (9:16, cerca de 19 s, sem áudio)
Arquivos em `videos/`. A fonte editável fica em `criativos/` (`anuncio-*.html` + `engine.js`; para gerar de novo: `node render.js <html> <mp4>`).
O conteúdo principal fica entre y=300 e y=1600, então o mesmo vídeo funciona no feed 4:5 (corte central).

## Texto do Gerenciador

### A — Rescisão
- Título: Rescisão: confira o seu acerto
- Texto principal:
  O acerto da rescisão tem prazo: até 10 dias após o fim do contrato (CLT, art. 477, § 6º).
  Na dispensa sem justa causa, entram saldo de salário, férias + 1/3, 13º proporcional, aviso prévio e FGTS com multa de 40%.
  Pagamento atrasado ou alguma verba faltando? O prazo para buscar a Justiça do Trabalho é de 2 anos após a saída.
  Tire sua dúvida pelo WhatsApp.
  Conteúdo informativo. Cada caso exige análise individual.

### B — Motorista
- Título: Tempo de espera é jornada
- Texto principal:
  Motorista profissional: desde 12/07/2023, por decisão do STF (ADI 5322), o tempo de espera em carga e descarga conta como jornada de trabalho.
  Antes, a lei permitia pagar esse período como indenização de 30%.
  Se o holerite ainda traz essa linha, ou se a jornada passa do limite, pode haver horas extras.
  Fale com a equipe pelo WhatsApp.
  Conteúdo informativo. Cada caso exige análise individual.

### C — Insalubridade (C2)
- Título: Insalubridade em grau máximo
- Texto principal:
  A limpeza de banheiros de uso público ou coletivo de grande circulação (shopping, rodoviária, escola, hospital, supermercado, hotel)
  tem sido reconhecida pela Justiça do Trabalho como insalubridade em grau máximo (TST, Súmula 448, II).
  Trabalha ou trabalhou nessa função com carteira assinada ou por empresa terceirizada? Tire sua dúvida pelo WhatsApp.
  Conteúdo informativo. Cada caso exige análise individual.

Botão (todos): Enviar mensagem (WhatsApp). Mensagens pré-preenchidas por região: ver `BRIEFING.md` / resposta de 24/10.

## Roteiro de triagem (WhatsApp da matriz)

"Roteiro de triagem" é a sequência de mensagens que o atendente (pessoa ou resposta automática) usa quando o contato chega pelo anúncio.
A ideia é separar, em poucas perguntas, quem tem um caso viável de quem não tem, antes de ocupar a agenda de um advogado.

### Abertura (igual para todos)
> Olá! Aqui é a equipe do Takahashi Advogados Associados. Obrigado pelo contato.
> Para entender melhor a sua situação, vou fazer algumas perguntas rápidas. Tudo bem?

### A — Rescisão
1. Em que cidade você trabalhava?
2. Você ainda trabalha na empresa ou já saiu? Se saiu, em que mês e ano?
   - Saída há mais de 2 anos → encerramento educado (prazo prescricional, CF art. 7º, XXIX).
3. Tinha carteira assinada?
4. Como foi a saída: dispensado pela empresa, pedido de demissão, justa causa ou acordo?
5. Recebeu o termo de rescisão e as guias do FGTS e do seguro-desemprego? O pagamento saiu em até 10 dias?
6. Fazia horas extras ou recebia algum valor "por fora"?
7. Tem os documentos (termo de rescisão, holerites, extrato do FGTS)? Pode enviar foto?

### B — Motorista
1. Em que cidade você mora / qual era a base da empresa?
2. Era motorista registrado (carteira assinada) ou autônomo/agregado?
   - Autônomo/agregado (TAC) → encaminhar para análise do advogado; não seguir o roteiro padrão.
3. Trabalhou como motorista depois de julho de 2023?
   - Só antes de 12/07/2023 → o tempo de espera não entra (modulação da ADI 5322); seguir só se houver horas extras por jornada.
4. Ainda trabalha ou já saiu? Se saiu, quando?
   - Saída há mais de 2 anos → encerramento educado.
5. No holerite aparece a linha "tempo de espera"? Pode enviar foto de um holerite?
6. O caminhão tinha rastreador ou telemetria? Quanto tempo ficava parado em fila de carga e descarga, em média?
7. Qual era a jornada média por dia? Dormia no caminhão?

### C — Insalubridade (limpeza)
1. Em que cidade você trabalha/trabalhava?
2. Carteira assinada direto com a empresa ou por terceirizada? Ainda trabalha ou já saiu (quando)?
   - Saída há mais de 2 anos → encerramento educado.
   - Servidor público (concursado) → fora desta campanha; registrar e encaminhar.
3. Onde fazia a limpeza (shopping, rodoviária, escola, hospital, supermercado, hotel, fábrica…)?
4. Os banheiros eram usados pelo público ou por muitas pessoas por dia? Quantas, mais ou menos?
   - Banheiro de uso restrito (poucos funcionários) → tende a não caracterizar grau máximo; sinalizar ao advogado.
5. Recebe/recebia adicional de insalubridade? Em que porcentagem (20% ou 40%) ou nada?
6. Recebia luvas e botas? Com que frequência trocava? Assinava ficha de EPI?
7. Pode enviar foto do holerite?

### Classificação do lead (para a equipe)
| Classe | Critério | Ação |
|---|---|---|
| Quente | Nenhuma resposta eliminatória e documento enviado | Agendar com o advogado da unidade |
| Morno | Sem eliminatória, mas sem documento | Pedir documento; retomar em 48 h |
| Frio | Prescrito, fora do perfil ou fora da campanha | Encerramento educado (modelo abaixo) |

Encerramento educado:
> Obrigado por explicar. Pelo que você contou, neste momento não conseguimos seguir com o seu caso,
> mas se surgir qualquer novidade ou dúvida, pode nos chamar por aqui.

Regras do atendimento: não informar valores a receber, não prometer resultado, não dar parecer pelo WhatsApp.
A análise é sempre feita pelo advogado.
