const translations = {
  'en': {
    'rule1': 'Respectful Behavior: All members should treat each other with respect. Avoid offensive language, discrimination, and aggressive behavior.',
    'rule2': 'No Bullying or Harassment: Bullying, harassment, or any form of harmful behavior towards other members is not allowed.',
    'rule3': 'No Offensive Content: Avoid posting any content that could be considered offensive, such as hate speech, disturbing images, or anything that may cause discomfort.',
    'rule4': 'Privacy: Respect the privacy of other members. Do not share personal information without permission.',
    'rule5': 'Appropriate Content: Keep chat content appropriate. Avoid discussions on sensitive or inappropriate topics.',
    'rule6': 'Collaborate and Share Positivity: Encourage a positive and collaborative atmosphere. Share ideas, experiences, and knowledge constructively.',
    'rule7': 'No Spam: Avoid sending repetitive messages or any type of spam. This includes unrelated links or excessive self-promotion.',
    'rule8': 'Follow Chat Rules: Follow the specific rules of your chat and be aware that rule violations may result in penalties, including removal from the chat.',
    'rule9': 'Report Inappropriate Behavior: If you witness or experience inappropriate behavior, report it to chat moderators or administrators.',
    'rule10': 'Participate Actively: Encourage members to participate actively, but respect those who prefer to observe. Diversity of participation is welcome.',
    'English': 'English',
    'Português': 'Português'
  },
  'pt': {
    'rule1': 'Respeito Mútuo: Todos os membros devem tratar uns aos outros com respeito. Evite linguagem ofensiva, discriminação e comportamento agressivo.',
    'rule2': 'Nada de Bullying ou Assédio: Não é permitido praticar bullying, assédio ou qualquer forma de comportamento prejudicial em relação aos outros membros.',
    'rule3': 'Sem Conteúdo Ofensivo: Evite postar qualquer conteúdo que possa ser considerado ofensivo, como linguagem de ódio, imagens perturbadoras ou qualquer coisa que possa causar desconforto.',
    'rule4': 'Privacidade: Respeite a privacidade dos outros membros. Não compartilhe informações pessoais sem permissão.',
    'rule5': 'Conteúdo Apropriado: Mantenha o conteúdo do chat apropriado. Evite discussões sobre tópicos sensíveis ou inadequados para o ambiente.',
    'rule6': 'Colabore e Compartilhe Positividade: Incentive uma atmosfera positiva e colaborativa. Compartilhe ideias, experiências e conhecimentos de forma construtiva.',
    'rule7': 'Sem Spam: Evite o envio repetitivo de mensagens ou qualquer tipo de spam. Isso inclui links não relacionados ou autopromoção excessiva.',
    'rule8': 'Respeite as Regras do Chat: Siga as regras específicas do seu chat e esteja ciente de que a quebra de regras pode resultar em penalidades, incluindo a remoção do chat.',
    'rule9': 'Reporte Comportamento Inadequado: Se você testemunhar ou experimentar comportamento inadequado, reporte para os moderadores ou administradores do chat.',
    'rule10': 'Participe de Forma Ativa: Encoraje os membros a participarem ativamente, mas respeite aqueles que preferem apenas observar. A diversidade de participação é bem-vinda.',
    'English': 'Inglês',
    'Português': 'Português'
  }
};

function toggleLanguage(language) {
  const elementsToTranslate = document.querySelectorAll('[data-translation-key]');
  elementsToTranslate.forEach(element => {
    const translationKey = element.getAttribute('data-translation-key');
    element.innerHTML = translations[language][translationKey];
  });

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.classList.remove('selected'));
  const selectedButton = document.querySelector(`button[data-translation-key="${language}"]`);
  selectedButton.classList.add('selected');
}