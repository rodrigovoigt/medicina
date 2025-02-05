document.addEventListener("input", function (event) {
    const activeElement = document.activeElement;
  
    if (activeElement instanceof HTMLTextAreaElement || activeElement instanceof HTMLInputElement) {
      const currentValue = activeElement.value;
      const selectionStart = activeElement.selectionStart;
  
      if (currentValue.slice(selectionStart - 6, selectionStart) === ";teste") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 6);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "Texto para teste se funciona a extensão";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 6 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 6 + replacementText.length;
      } else if (currentValue.slice(selectionStart - 8, selectionStart) === ";default") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 8);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "#Alergias: \n#Comorbidades: \n#Medicamentos de uso contínuo: \n#Vícios: \n#S: \nQP: \n \n#O: \nBom estado geral, lúcido, orientado em tempo e espaço, acianótico, anictérico, afebril, mucosas úmidas e normocoradas, eutrófico, normotônico, boas condições de higiene, deambulando sem auxílio, fácies atípica, ativo.  \n#A: \n#P:";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 8 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 8 + replacementText.length;
      } else if (currentValue.slice(selectionStart - 4, selectionStart) === ";beg") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 4);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "Bom estado geral";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 4 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 4 + replacementText.length;
      } else if (currentValue.slice(selectionStart - 7, selectionStart) === ";bompct") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 7);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "Bom estado geral, lúcido, orientado em tempo e espaço, acianótico, anictérico, afebril, mucosas úmidas e normocoradas, eutrófico, normotônico, boas condições de higiene, deambulando sem auxílio, fácies atípica, ativo";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 7 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 7 + replacementText.length;
      } else if (currentValue.slice(selectionStart - 9, selectionStart) === ";efcardio") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 9);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "Ausculta cardíaca: \nBulhas normofonéticas, em 2 tempos, com ritmo regular, sem sopros";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 9 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 9 + replacementText.length;
      } else if (currentValue.slice(selectionStart - 9, selectionStart) === ";efpneumo") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 9);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "Ausculta pneumológica: \nMurmúrios vesiculares presentes, bilateralmente, simétricos, sem ruídos adventícios";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 9 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 9 + replacementText.length;
      } else if (currentValue.slice(selectionStart - 9, selectionStart) === ";efabdome") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 9);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "Exame físico de abdômen: \nAbdômen plano, flácido, depressível, ruídos hidroaéreos presentes, timpanismo difuso a percussão, sem dor a palpação profunda ou superficial, sem visceromegalias";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 9 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 9 + replacementText.length;
      } else if (currentValue.slice(selectionStart - 8, selectionStart) === ";efneuro") {
        const textBeforeCursor = currentValue.slice(0, selectionStart - 8);
        const textAfterCursor = currentValue.slice(selectionStart);
        const replacementText = "Exame físico neurológico: \nPupilas isocóricas e isofotorreagentes, pares cranianos sem alterações, força, sensibilidade e coordenação preservada nos quatro membros, reflexos osteotendíneos normais, marcha sem alterações, sem sinais meníngeos";
        const newTextValue = textBeforeCursor + replacementText + textAfterCursor;
        activeElement.value = newTextValue;
        activeElement.selectionStart = selectionStart - 8 + replacementText.length;
        activeElement.selectionEnd = selectionStart - 8 + replacementText.length;
      }
    }
  });
  