

        function handle_keypress(e, nameOfDiv) {
            var div = document.getElementById(nameOfDiv);
 
            var val = typeof window.event != 'undefined' ? window.event.keyCode : e.keyCode;
            if (val == 13)
                div.focus();
 
            return !(val == 13);
        }
 
        var aResposta = new Array(17);
 
        function toggle(id) {
            var state = document.getElementById(id).style.display;
            if (state == 'block') {
                document.getElementById(id).style.display = 'none';
            } else {
                document.getElementById(id).style.display = 'block';
            }
        }
 
 
 
        function changeDivContent(nameOfDiv, newContent) {
            var div = document.getElementById(nameOfDiv);
            if (div) {
                div.innerHTML = newContent;
            }
        }
 
 
        function IsNumeric(sText) {
            var ValidChars = "0123456789.";
            var IsNumber = true;
            var Char;
 
 
            for (i = 0; i < sText.length && IsNumber == true; i++) {
                Char = sText.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    IsNumber = false;
                }
            }
            return IsNumber;
 
        }
 
        function round(num, dec) {
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }
        function page3() {
            document.getElementById('page3').style.display = 'block';
            document.getElementById('page2').style.display = 'none';
            document.getElementById('page1').style.display = 'none';
            document.getElementById('main').style.display = 'none';
            scroll(0, 0);
 
            aResposta[0] = new Array(3);
            aResposta[0][0] = "autonomia";
            aResposta[0][1] = document.getElementById("iQQ1").value;
            aResposta[0][2] = "1";
 
            aResposta[1] = new Array(3);
            aResposta[1][0] = "tempo de contato direto com o paciente";
            aResposta[1][1] = document.getElementById("iQQ2").value;
            aResposta[1][2] = "2";
 
            aResposta[2] = new Array(3);
            aResposta[2][0] = "depend&#234;ncia do paciente";
            aResposta[2][1] = document.getElementById("iQQ3").value;
            aResposta[2][2] = "3";
 
            aResposta[3] = new Array(3);
            aResposta[3][0] = "diversidade de patologias";
            aResposta[3][1] = document.getElementById("iQQ4").value;
            aResposta[3][2] = "4";
 
            aResposta[4] = new Array(3);
            aResposta[4][0] = "tempo livre";
            aResposta[4][1] = document.getElementById("iQQ5").value;
            aResposta[4][2] = "5";
 
            aResposta[5] = new Array(3);
            aResposta[5][0] = "conhecimentos t&#233;cnicos";
            aResposta[5][1] = document.getElementById("iQQ6").value;
            aResposta[5][2] = "6";
 
            aResposta[6] = new Array(3);
            aResposta[6][0] = "ganhos financeiros";
            aResposta[6][1] = document.getElementById("iQQ7").value;
            aResposta[6][2] = "7";
 
            aResposta[7] = new Array(3);
            aResposta[7][0] = "criatividade";
            aResposta[7][1] = document.getElementById("iQQ8").value;
            aResposta[7][2] = "8";
 
            aResposta[8] = new Array(3);
            aResposta[8][0] = "raciocinio l&#243;gico";
            aResposta[8][1] = document.getElementById("iQQ9").value;
            aResposta[8][2] = "9";
 
            aResposta[9] = new Array(3);
            aResposta[9][0] = "relacionamento com outros colegas";
            aResposta[9][1] = document.getElementById("iQQ10").value;
            aResposta[9][2] = "10";
 
            aResposta[10] = new Array(3);
            aResposta[10][0] = "habilidade manual";
            aResposta[10][1] = document.getElementById("iQQ11").value;
            aResposta[10][2] = "11";
 
            aResposta[11] = new Array(3);
            aResposta[11][0] = "estresse";
            aResposta[11][1] = document.getElementById("iQQ12").value;
            aResposta[11][2] = "12";
 
            aResposta[12] = new Array(3);
            aResposta[12][0] = "responsabilidade";
            aResposta[12][1] = document.getElementById("iQQ13").value;
            aResposta[12][2] = "13";
 
            aResposta[13] = new Array(3);
            aResposta[13][0] = "regularidade de hor&#225;rios";
            aResposta[13][1] = document.getElementById("iQQ14").value;
            aResposta[13][2] = "14";
 
            aResposta[14] = new Array(3);
            aResposta[14][0] = "seguran&#231;a profissional";
            aResposta[14][1] = document.getElementById("iQQ15").value;
            aResposta[14][2] = "15";
 
            aResposta[15] = new Array(3);
            aResposta[15][0] = "resultados";
            aResposta[15][1] = document.getElementById("iQQ16").value;
            aResposta[15][2] = "16";
 
            aResposta[16] = new Array(3);
            aResposta[16][0] = "status";
            aResposta[16][1] = document.getElementById("iQQ17").value;
            aResposta[16][2] = "17";
 
            var i1 = 0;
            for (i1 = 0; i1 < aResposta.length; i1++) {
 
                if (!IsNumeric(aResposta[i1][1])) {
                    aResposta[i1][1] = "0";
                }
                else if (aResposta[i1][1] == "") { //.trim()
                    aResposta[i1][1] = "0";
                }
                else {
                    if (round(aResposta[i1][1], 2) > 10) {
                        aResposta[i1][1] = "10";
                    }
                    else {
                        aResposta[i1][1] = round(aResposta[i1][1], 2);
                    }
                }
 
 
            }


            var Calculo = new Array(57);
            Calculo[0] = new Array(3);
            Calculo[0][0] = "Alergologia e Imunologia";
            Calculo[0][1] = "0";
            Calculo[0][2] = new Array(17);
            Calculo[0][2][0] = "8.46";
            Calculo[0][2][1] = "8.77";
            Calculo[0][2][2] = "8.51";
            Calculo[0][2][3] = "5.71";
            Calculo[0][2][4] = "7.11";
            Calculo[0][2][5] = "8.55";
            Calculo[0][2][6] = "5.72";
            Calculo[0][2][7] = "7.1";
            Calculo[0][2][8] = "6.1";
            Calculo[0][2][9] = "5.27";
            Calculo[0][2][10] = "3.75";
            Calculo[0][2][11] = "5.27";
            Calculo[0][2][12] = "8.8";
            Calculo[0][2][13] = "7.1";
            Calculo[0][2][14] = "5.71";
            Calculo[0][2][15] = "8.85";
            Calculo[0][2][16] = "5.22";
 
 
            Calculo[1] = new Array(3);
            Calculo[1][0] = "Anestesiologia";
            Calculo[1][1] = "0";
            Calculo[1][2] = new Array(17);
            Calculo[1][2][0] = "8.07";
            Calculo[1][2][1] = "8.38";
            Calculo[1][2][2] = "2.78";
            Calculo[1][2][3] = "6.42";
            Calculo[1][2][4] = "6.6";
            Calculo[1][2][5] = "8.48";
            Calculo[1][2][6] = "6.92";
            Calculo[1][2][7] = "7.25";
            Calculo[1][2][8] = "4.73";
            Calculo[1][2][9] = "8.45";
            Calculo[1][2][10] = "8.68";
            Calculo[1][2][11] = "8.13";
            Calculo[1][2][12] = "9.02";
            Calculo[1][2][13] = "3.93";
            Calculo[1][2][14] = "4.85";
            Calculo[1][2][15] = "7.95";
            Calculo[1][2][16] = "5.03";
 
            Calculo[2] = new Array(3);
            Calculo[2][0] = "Cardiologia";
            Calculo[2][1] = "0";
            Calculo[2][2] = new Array(17);
            Calculo[2][2][0] = "8";
            Calculo[2][2][1] = "7.5";
            Calculo[2][2][2] = "7.05";
            Calculo[2][2][3] = "7.21";
            Calculo[2][2][4] = "4.55";
            Calculo[2][2][5] = "8.86";
            Calculo[2][2][6] = "6.6";
            Calculo[2][2][7] = "7.79";
            Calculo[2][2][8] = "5.4";
            Calculo[2][2][9] = "8.02";
            Calculo[2][2][10] = "6.59";
            Calculo[2][2][11] = "7.63";
            Calculo[2][2][12] = "8.83";
            Calculo[2][2][13] = "3.88";
            Calculo[2][2][14] = "5.33";
            Calculo[2][2][15] = "8.76";
            Calculo[2][2][16] = "7.5";
 
            Calculo[3] = new Array(3);
            Calculo[3][0] = "Proctologia";
            Calculo[3][1] = "0";
            Calculo[3][2] = new Array(17);
            Calculo[3][2][0] = "8.73";
            Calculo[3][2][1] = "6.98";
            Calculo[3][2][2] = "7.63";
            Calculo[3][2][3] = "6.81";
            Calculo[3][2][4] = "6.25";
            Calculo[3][2][5] = "8.98";
            Calculo[3][2][6] = "6.62";
            Calculo[3][2][7] = "6.76";
            Calculo[3][2][8] = "5.27";
            Calculo[3][2][9] = "6.86";
            Calculo[3][2][10] = "9.19";
            Calculo[3][2][11] = "7.52";
            Calculo[3][2][12] = "9.3";
            Calculo[3][2][13] = "4.7";
            Calculo[3][2][14] = "5.24";
            Calculo[3][2][15] = "9.24";
            Calculo[3][2][16] = "7.41";
 
            Calculo[4] = new Array(3);
            Calculo[4][0] = "CTI";
            Calculo[4][1] = "0";
            Calculo[4][2] = new Array(17);
            Calculo[4][2][0] = "8.35";
            Calculo[4][2][1] = "8";
            Calculo[4][2][2] = "6.26";
            Calculo[4][2][3] = "7.75";
            Calculo[4][2][4] = "5.03";
            Calculo[4][2][5] = "7.98";
            Calculo[4][2][6] = "6.32";
            Calculo[4][2][7] = "7.67";
            Calculo[4][2][8] = "5.32";
            Calculo[4][2][9] = "8.24";
            Calculo[4][2][10] = "7.54";
            Calculo[4][2][11] = "8.21";
            Calculo[4][2][12] = "8.62";
            Calculo[4][2][13] = "3.43";
            Calculo[4][2][14] = "5.36";
            Calculo[4][2][15] = "8.42";
            Calculo[4][2][16] = "7.36";
 
            Calculo[5] = new Array(3);
            Calculo[5][0] = "Dermatologia";
            Calculo[5][1] = "0";
            Calculo[5][2] = new Array(17);
            Calculo[5][2][0] = "7.55";
            Calculo[5][2][1] = "9.04";
            Calculo[5][2][2] = "8.24";
            Calculo[5][2][3] = "6.78";
            Calculo[5][2][4] = "7.77";
            Calculo[5][2][5] = "8.16";
            Calculo[5][2][6] = "6.53";
            Calculo[5][2][7] = "7.27";
            Calculo[5][2][8] = "5.18";
            Calculo[5][2][9] = "4.63";
            Calculo[5][2][10] = "7.22";
            Calculo[5][2][11] = "4.91";
            Calculo[5][2][12] = "8.95";
            Calculo[5][2][13] = "7.8";
            Calculo[5][2][14] = "6.51";
            Calculo[5][2][15] = "8.9";
            Calculo[5][2][16] = "5.32";
 
            Calculo[6] = new Array(3);
            Calculo[6][0] = "Emerg&#234;ncia";
            Calculo[6][1] = "0";
            Calculo[6][2] = new Array(17);
            Calculo[6][2][0] = "8.04";
            Calculo[6][2][1] = "8.05";
            Calculo[6][2][2] = "2.77";
            Calculo[6][2][3] = "8.3";
            Calculo[6][2][4] = "6.89";
            Calculo[6][2][5] = "5.54";
            Calculo[6][2][6] = "5.79";
            Calculo[6][2][7] = "7.39";
            Calculo[6][2][8] = "4.48";
            Calculo[6][2][9] = "7.08";
            Calculo[6][2][10] = "6.64";
            Calculo[6][2][11] = "8.47";
            Calculo[6][2][12] = "8.98";
            Calculo[6][2][13] = "4.25";
            Calculo[6][2][14] = "5.38";
            Calculo[6][2][15] = "6.69";
            Calculo[6][2][16] = "5.32";
 
            Calculo[7] = new Array(3);
            Calculo[7][0] = "Endocrinologia";
            Calculo[7][1] = "0";
            Calculo[7][2] = new Array(17);
            Calculo[7][2][0] = "8.37";
            Calculo[7][2][1] = "7.41";
            Calculo[7][2][2] = "8";
            Calculo[7][2][3] = "7.54";
            Calculo[7][2][4] = "5.61";
            Calculo[7][2][5] = "8.48";
            Calculo[7][2][6] = "4";
            Calculo[7][2][7] = "8.11";
            Calculo[7][2][8] = "7.07";
            Calculo[7][2][9] = "7.28";
            Calculo[7][2][10] = "3.41";
            Calculo[7][2][11] = "5.65";
            Calculo[7][2][12] = "8.8";
            Calculo[7][2][13] = "6";
            Calculo[7][2][14] = "6";
            Calculo[7][2][15] = "8.76";
            Calculo[7][2][16] = "6.49";
 
            Calculo[8] = new Array(3);
            Calculo[8][0] = "Medicina Familiar";
            Calculo[8][1] = "0";
            Calculo[8][2] = new Array(17);
            Calculo[8][2][0] = "7.43";
            Calculo[8][2][1] = "7.92";
            Calculo[8][2][2] = "7.77";
            Calculo[8][2][3] = "7.54";
            Calculo[8][2][4] = "6.5";
            Calculo[8][2][5] = "5.37";
            Calculo[8][2][6] = "3.9";
            Calculo[8][2][7] = "6.93";
            Calculo[8][2][8] = "4.99";
            Calculo[8][2][9] = "6.65";
            Calculo[8][2][10] = "4.91";
            Calculo[8][2][11] = "6.77";
            Calculo[8][2][12] = "8.39";
            Calculo[8][2][13] = "6.17";
            Calculo[8][2][14] = "5.68";
            Calculo[8][2][15] = "7.99";
            Calculo[8][2][16] = "4.88";
 
            Calculo[9] = new Array(3);
            Calculo[9][0] = "Gastroenterologia";
            Calculo[9][1] = "0";
            Calculo[9][2] = new Array(17);
            Calculo[9][2][0] = "7.97";
            Calculo[9][2][1] = "8.66";
            Calculo[9][2][2] = "7.18";
            Calculo[9][2][3] = "7.34";
            Calculo[9][2][4] = "4.89";
            Calculo[9][2][5] = "8.61";
            Calculo[9][2][6] = "6.32";
            Calculo[9][2][7] = "7.13";
            Calculo[9][2][8] = "5.63";
            Calculo[9][2][9] = "7.45";
            Calculo[9][2][10] = "8.74";
            Calculo[9][2][11] = "7.32";
            Calculo[9][2][12] = "8.61";
            Calculo[9][2][13] = "3.84";
            Calculo[9][2][14] = "4.47";
            Calculo[9][2][15] = "8.5";
            Calculo[9][2][16] = "7.29";
 
            Calculo[10] = new Array(3);
            Calculo[10][0] = "Cirurgia Geral";
            Calculo[10][1] = "0";
            Calculo[10][2] = new Array(17);
            Calculo[10][2][0] = "8.07";
            Calculo[10][2][1] = "8.56";
            Calculo[10][2][2] = "6.73";
            Calculo[10][2][3] = "7.3";
            Calculo[10][2][4] = "4.75";
            Calculo[10][2][5] = "8.13";
            Calculo[10][2][6] = "6.04";
            Calculo[10][2][7] = "7.45";
            Calculo[10][2][8] = "5.29";
            Calculo[10][2][9] = "7.66";
            Calculo[10][2][10] = "9.03";
            Calculo[10][2][11] = "8.04";
            Calculo[10][2][12] = "9.25";
            Calculo[10][2][13] = "2.66";
            Calculo[10][2][14] = "4.64";
            Calculo[10][2][15] = "9.03";
            Calculo[10][2][16] = "7.47";
 
            Calculo[11] = new Array(3);
            Calculo[11][0] = "Geriatria";
            Calculo[11][1] = "0";
            Calculo[11][2] = new Array(17);
            Calculo[11][2][0] = "8.24";
            Calculo[11][2][1] = "6.98";
            Calculo[11][2][2] = "8.88";
            Calculo[11][2][3] = "7.82";
            Calculo[11][2][4] = "6.17";
            Calculo[11][2][5] = "6.59";
            Calculo[11][2][6] = "3.82";
            Calculo[11][2][7] = "7.8";
            Calculo[11][2][8] = "6.03";
            Calculo[11][2][9] = "7.68";
            Calculo[11][2][10] = "3.02";
            Calculo[11][2][11] = "6.44";
            Calculo[11][2][12] = "8.33";
            Calculo[11][2][13] = "5.78";
            Calculo[11][2][14] = "5.46";
            Calculo[11][2][15] = "8.02";
            Calculo[11][2][16] = "4.9";
 
            Calculo[12] = new Array(3);
            Calculo[12][0] = "Hematologia";
            Calculo[12][1] = "0";
            Calculo[12][2] = new Array(17);
            Calculo[12][2][0] = "8.28";
            Calculo[12][2][1] = "7.85";
            Calculo[12][2][2] = "8.5";
            Calculo[12][2][3] = "7.78";
            Calculo[12][2][4] = "5.1";
            Calculo[12][2][5] = "8.51";
            Calculo[12][2][6] = "5.19";
            Calculo[12][2][7] = "8.1";
            Calculo[12][2][8] = "6.38";
            Calculo[12][2][9] = "6.15";
            Calculo[12][2][10] = "3.94";
            Calculo[12][2][11] = "7.87";
            Calculo[12][2][12] = "8.99";
            Calculo[12][2][13] = "4.66";
            Calculo[12][2][14] = "4.93";
            Calculo[12][2][15] = "8.37";
            Calculo[12][2][16] = "6.89";
 
            Calculo[13] = new Array(3);
            Calculo[13][0] = "Infectologia";
            Calculo[13][1] = "0";
            Calculo[13][2] = new Array(17);
            Calculo[13][2][0] = "8.38";
            Calculo[13][2][1] = "6.74";
            Calculo[13][2][2] = "6.71";
            Calculo[13][2][3] = "7.84";
            Calculo[13][2][4] = "5.6";
            Calculo[13][2][5] = "7.95";
            Calculo[13][2][6] = "3.58";
            Calculo[13][2][7] = "7.98";
            Calculo[13][2][8] = "6.57";
            Calculo[13][2][9] = "8.13";
            Calculo[13][2][10] = "2.65";
            Calculo[13][2][11] = "6.75";
            Calculo[13][2][12] = "8.23";
            Calculo[13][2][13] = "4.79";
            Calculo[13][2][14] = "5.37";
            Calculo[13][2][15] = "8.48";
            Calculo[13][2][16] = "6.4";
 
            Calculo[14] = new Array(3);
            Calculo[14][0] = "Medicina Interna";
            Calculo[14][1] = "0";
            Calculo[14][2] = new Array(17);
            Calculo[14][2][0] = "7.84";
            Calculo[14][2][1] = "7.62";
            Calculo[14][2][2] = "7.99";
            Calculo[14][2][3] = "7.17";
            Calculo[14][2][4] = "5.42";
            Calculo[14][2][5] = "6.92";
            Calculo[14][2][6] = "4.42";
            Calculo[14][2][7] = "6.97";
            Calculo[14][2][8] = "5.91";
            Calculo[14][2][9] = "3.29";
            Calculo[14][2][10] = "4.25";
            Calculo[14][2][11] = "6.87";
            Calculo[14][2][12] = "8.42";
            Calculo[14][2][13] = "4.98";
            Calculo[14][2][14] = "4.87";
            Calculo[14][2][15] = "7.89";
            Calculo[14][2][16] = "6.19";
 
            Calculo[15] = new Array(3);
            Calculo[15][0] = "Oncologia";
            Calculo[15][1] = "0";
            Calculo[15][2] = new Array(17);
            Calculo[15][2][0] = "8.38";
            Calculo[15][2][1] = "8.49";
            Calculo[15][2][2] = "8.58";
            Calculo[15][2][3] = "7.6";
            Calculo[15][2][4] = "4.7";
            Calculo[15][2][5] = "7.91";
            Calculo[15][2][6] = "6.09";
            Calculo[15][2][7] = "8.18";
            Calculo[15][2][8] = "5.66";
            Calculo[15][2][9] = "7.53";
            Calculo[15][2][10] = "3.86";
            Calculo[15][2][11] = "8.01";
            Calculo[15][2][12] = "8.74";
            Calculo[15][2][13] = "4.47";
            Calculo[15][2][14] = "5.1";
            Calculo[15][2][15] = "8.25";
            Calculo[15][2][16] = "7.41";
 
            Calculo[16] = new Array(3);
            Calculo[16][0] = "Nefrologia";
            Calculo[16][1] = "0";
            Calculo[16][2] = new Array(17);
            Calculo[16][2][0] = "7.97";
            Calculo[16][2][1] = "8.71";
            Calculo[16][2][2] = "8.55";
            Calculo[16][2][3] = "7.47";
            Calculo[16][2][4] = "5.16";
            Calculo[16][2][5] = "8.71";
            Calculo[16][2][6] = "6.08";
            Calculo[16][2][7] = "7.59";
            Calculo[16][2][8] = "5.82";
            Calculo[16][2][9] = "7.58";
            Calculo[16][2][10] = "5.16";
            Calculo[16][2][11] = "7.63";
            Calculo[16][2][12] = "8.61";
            Calculo[16][2][13] = "3.76";
            Calculo[16][2][14] = "5.19";
            Calculo[16][2][15] = "8.03";
            Calculo[16][2][16] = "8.05";
 
            Calculo[17] = new Array(3);
            Calculo[17][0] = "Neurocirurgia";
            Calculo[17][1] = "0";
            Calculo[17][2] = new Array(17);
            Calculo[17][2][0] = "7.98";
            Calculo[17][2][1] = "8.62";
            Calculo[17][2][2] = "6.6";
            Calculo[17][2][3] = "6.8";
            Calculo[17][2][4] = "3.86";
            Calculo[17][2][5] = "9.32";
            Calculo[17][2][6] = "7.92";
            Calculo[17][2][7] = "7.86";
            Calculo[17][2][8] = "5.77";
            Calculo[17][2][9] = "6.8";
            Calculo[17][2][10] = "9.34";
            Calculo[17][2][11] = "8.9";
            Calculo[17][2][12] = "9.5";
            Calculo[17][2][13] = "3.17";
            Calculo[17][2][14] = "4.94";
            Calculo[17][2][15] = "8.72";
            Calculo[17][2][16] = "8.82";
 
            Calculo[18] = new Array(3);
            Calculo[18][0] = "Neurologia";
            Calculo[18][1] = "0";
            Calculo[18][2] = new Array(17);
            Calculo[18][2][0] = "8.09";
            Calculo[18][2][1] = "8.13";
            Calculo[18][2][2] = "7.7";
            Calculo[18][2][3] = "7.02";
            Calculo[18][2][4] = "4.83";
            Calculo[18][2][5] = "8.35";
            Calculo[18][2][6] = "5.18";
            Calculo[18][2][7] = "7.89";
            Calculo[18][2][8] = "7.09";
            Calculo[18][2][9] = "7.41";
            Calculo[18][2][10] = "3.83";
            Calculo[18][2][11] = "7.09";
            Calculo[18][2][12] = "8.91";
            Calculo[18][2][13] = "5.11";
            Calculo[18][2][14] = "5.54";
            Calculo[18][2][15] = "7.85";
            Calculo[18][2][16] = "7.39";
 
            Calculo[19] = new Array(3);
            Calculo[19][0] = "Medicina Nuclear";
            Calculo[19][1] = "0";
            Calculo[19][2] = new Array(17);
            Calculo[19][2][0] = "7.4";
            Calculo[19][2][1] = "4.58";
            Calculo[19][2][2] = "3";
            Calculo[19][2][3] = "7.23";
            Calculo[19][2][4] = "6.85";
            Calculo[19][2][5] = "8.68";
            Calculo[19][2][6] = "6.62";
            Calculo[19][2][7] = "8.28";
            Calculo[19][2][8] = "5.78";
            Calculo[19][2][9] = "7.38";
            Calculo[19][2][10] = "5.13";
            Calculo[19][2][11] = "6.04";
            Calculo[19][2][12] = "8.47";
            Calculo[19][2][13] = "6.27";
            Calculo[19][2][14] = "4.75";
            Calculo[19][2][15] = "7";
            Calculo[19][2][16] = "5.98";
 
            Calculo[20] = new Array(3);
            Calculo[20][0] = "Gineco-Obstetricia";
            Calculo[20][1] = "0";
            Calculo[20][2] = new Array(17);
            Calculo[20][2][0] = "8.42";
            Calculo[20][2][1] = "8.4";
            Calculo[20][2][2] = "7.6";
            Calculo[20][2][3] = "7.33";
            Calculo[20][2][4] = "5.37";
            Calculo[20][2][5] = "7.6";
            Calculo[20][2][6] = "6.16";
            Calculo[20][2][7] = "7.02";
            Calculo[20][2][8] = "4.53";
            Calculo[20][2][9] = "6.98";
            Calculo[20][2][10] = "7.81";
            Calculo[20][2][11] = "7.88";
            Calculo[20][2][12] = "8.6";
            Calculo[20][2][13] = "2.66";
            Calculo[20][2][14] = "5.54";
            Calculo[20][2][15] = "9.16";
            Calculo[20][2][16] = "6.79";
 
            Calculo[21] = new Array(3);
            Calculo[21][0] = "Oftalmologia";
            Calculo[21][1] = "0";
            Calculo[21][2] = new Array(17);
            Calculo[21][2][0] = "8.02";
            Calculo[21][2][1] = "8.84";
            Calculo[21][2][2] = "8.61";
            Calculo[21][2][3] = "6.04";
            Calculo[21][2][4] = "7.25";
            Calculo[21][2][5] = "8.88";
            Calculo[21][2][6] = "6.16";
            Calculo[21][2][7] = "6.96";
            Calculo[21][2][8] = "5.05";
            Calculo[21][2][9] = "4.48";
            Calculo[21][2][10] = "7.73";
            Calculo[21][2][11] = "6.32";
            Calculo[21][2][12] = "9.18";
            Calculo[21][2][13] = "6.79";
            Calculo[21][2][14] = "4.95";
            Calculo[21][2][15] = "8.89";
            Calculo[21][2][16] = "6.38";
 
            Calculo[22] = new Array(3);
            Calculo[22][0] = "Ortopedia";
            Calculo[22][1] = "0";
            Calculo[22][2] = new Array(17);
            Calculo[22][2][0] = "8.26";
            Calculo[22][2][1] = "8.5";
            Calculo[22][2][2] = "7.89";
            Calculo[22][2][3] = "7.55";
            Calculo[22][2][4] = "4.71";
            Calculo[22][2][5] = "8.54";
            Calculo[22][2][6] = "7.76";
            Calculo[22][2][7] = "8.26";
            Calculo[22][2][8] = "5.43";
            Calculo[22][2][9] = "6.46";
            Calculo[22][2][10] = "9.16";
            Calculo[22][2][11] = "8";
            Calculo[22][2][12] = "9.35";
            Calculo[22][2][13] = "3.57";
            Calculo[22][2][14] = "5.03";
            Calculo[22][2][15] = "9.18";
            Calculo[22][2][16] = "8.03";
 
            Calculo[23] = new Array(3);
            Calculo[23][0] = "Otorrinolaringologia";
            Calculo[23][1] = "0";
            Calculo[23][2] = new Array(17);
            Calculo[23][2][0] = "8.57";
            Calculo[23][2][1] = "8.78";
            Calculo[23][2][2] = "7.41";
            Calculo[23][2][3] = "7.43";
            Calculo[23][2][4] = "6.25";
            Calculo[23][2][5] = "8.49";
            Calculo[23][2][6] = "6.29";
            Calculo[23][2][7] = "7.35";
            Calculo[23][2][8] = "5.85";
            Calculo[23][2][9] = "5.62";
            Calculo[23][2][10] = "8.48";
            Calculo[23][2][11] = "6.43";
            Calculo[23][2][12] = "9.1";
            Calculo[23][2][13] = "5.72";
            Calculo[23][2][14] = "5.11";
            Calculo[23][2][15] = "8.94";
            Calculo[23][2][16] = "6.98";
 
            Calculo[24] = new Array(3);
            Calculo[24][0] = "Patologia";
            Calculo[24][1] = "0";
            Calculo[24][2] = new Array(17);
            Calculo[24][2][0] = "7.24";
            Calculo[24][2][1] = "3.41";
            Calculo[24][2][2] = "2.99";
            Calculo[24][2][3] = "6.93";
            Calculo[24][2][4] = "7.38";
            Calculo[24][2][5] = "8";
            Calculo[24][2][6] = "5.27";
            Calculo[24][2][7] = "7.32";
            Calculo[24][2][8] = "5.34";
            Calculo[24][2][9] = "7.57";
            Calculo[24][2][10] = "5.24";
            Calculo[24][2][11] = "6.38";
            Calculo[24][2][12] = "8.91";
            Calculo[24][2][13] = "6.89";
            Calculo[24][2][14] = "4.7";
            Calculo[24][2][15] = "7.44";
            Calculo[24][2][16] = "5.62";
 
            Calculo[25] = new Array(3);
            Calculo[25][0] = "Pediatria";
            Calculo[25][1] = "0";
            Calculo[25][2] = new Array(17);
            Calculo[25][2][0] = "8.27";
            Calculo[25][2][1] = "8.05";
            Calculo[25][2][2] = "8.33";
            Calculo[25][2][3] = "6.9";
            Calculo[25][2][4] = "6.35";
            Calculo[25][2][5] = "6.47";
            Calculo[25][2][6] = "3.07";
            Calculo[25][2][7] = "6.9";
            Calculo[25][2][8] = "5.21";
            Calculo[25][2][9] = "6.87";
            Calculo[25][2][10] = "3.33";
            Calculo[25][2][11] = "6.54";
            Calculo[25][2][12] = "8.49";
            Calculo[25][2][13] = "4.9";
            Calculo[25][2][14] = "5.81";
            Calculo[25][2][15] = "8.16";
            Calculo[25][2][16] = "4.86";
 
            Calculo[26] = new Array(3);
            Calculo[26][0] = "Fisiatria";
            Calculo[26][1] = "0";
            Calculo[26][2] = new Array(17);
            Calculo[26][2][0] = "7.85";
            Calculo[26][2][1] = "8.32";
            Calculo[26][2][2] = "7.75";
            Calculo[26][2][3] = "6.9";
            Calculo[26][2][4] = "7.56";
            Calculo[26][2][5] = "6.79";
            Calculo[26][2][6] = "5.46";
            Calculo[26][2][7] = "6.82";
            Calculo[26][2][8] = "5.13";
            Calculo[26][2][9] = "7.37";
            Calculo[26][2][10] = "4.56";
            Calculo[26][2][11] = "4.93";
            Calculo[26][2][12] = "7.86";
            Calculo[26][2][13] = "6.56";
            Calculo[26][2][14] = "5.23";
            Calculo[26][2][15] = "7.65";
            Calculo[26][2][16] = "4.17";
 
            Calculo[27] = new Array(3);
            Calculo[27][0] = "Cirurgia Plastica";
            Calculo[27][1] = "0";
            Calculo[27][2] = new Array(17);
            Calculo[27][2][0] = "8.82";
            Calculo[27][2][1] = "8.5";
            Calculo[27][2][2] = "6.76";
            Calculo[27][2][3] = "7.95";
            Calculo[27][2][4] = "5.44";
            Calculo[27][2][5] = "9.44";
            Calculo[27][2][6] = "7.63";
            Calculo[27][2][7] = "9";
            Calculo[27][2][8] = "5.5";
            Calculo[27][2][9] = "5.19";
            Calculo[27][2][10] = "9.52";
            Calculo[27][2][11] = "7.28";
            Calculo[27][2][12] = "9.59";
            Calculo[27][2][13] = "4.35";
            Calculo[27][2][14] = "5.39";
            Calculo[27][2][15] = "9.36";
            Calculo[27][2][16] = "7.68";
 
            Calculo[28] = new Array(3);
            Calculo[28][0] = "Medicina Preventiva";
            Calculo[28][1] = "0";
            Calculo[28][2] = new Array(17);
            Calculo[28][2][0] = "7.88";
            Calculo[28][2][1] = "3.54";
            Calculo[28][2][2] = "5.57";
            Calculo[28][2][3] = "8.23";
            Calculo[28][2][4] = "7.63";
            Calculo[28][2][5] = "6.73";
            Calculo[28][2][6] = "3.15";
            Calculo[28][2][7] = "8.21";
            Calculo[28][2][8] = "6.42";
            Calculo[28][2][9] = "6.56";
            Calculo[28][2][10] = "2.48";
            Calculo[28][2][11] = "5.56";
            Calculo[28][2][12] = "7.96";
            Calculo[28][2][13] = "6.95";
            Calculo[28][2][14] = "5.85";
            Calculo[28][2][15] = "7.7";
            Calculo[28][2][16] = "4.44";
 
            Calculo[29] = new Array(3);
            Calculo[29][0] = "Psiquiatria";
            Calculo[29][1] = "0";
            Calculo[29][2] = new Array(17);
            Calculo[29][2][0] = "7.98";
            Calculo[29][2][1] = "8.3";
            Calculo[29][2][2] = "8.65";
            Calculo[29][2][3] = "7.33";
            Calculo[29][2][4] = "6.86";
            Calculo[29][2][5] = "7.49";
            Calculo[29][2][6] = "3.76";
            Calculo[29][2][7] = "7.62";
            Calculo[29][2][8] = "6.52";
            Calculo[29][2][9] = "5.03";
            Calculo[29][2][10] = "2.05";
            Calculo[29][2][11] = "6.81";
            Calculo[29][2][12] = "8.73";
            Calculo[29][2][13] = "6.44";
            Calculo[29][2][14] = "5.27";
            Calculo[29][2][15] = "7.87";
            Calculo[29][2][16] = "3.97";
 
            Calculo[30] = new Array(3);
            Calculo[30][0] = "Pneumologia";
            Calculo[30][1] = "0";
            Calculo[30][2] = new Array(17);
            Calculo[30][2][0] = "8.59";
            Calculo[30][2][1] = "7.95";
            Calculo[30][2][2] = "7.77";
            Calculo[30][2][3] = "7.69";
            Calculo[30][2][4] = "5.2";
            Calculo[30][2][5] = "7.85";
            Calculo[30][2][6] = "5.66";
            Calculo[30][2][7] = "7.47";
            Calculo[30][2][8] = "5.63";
            Calculo[30][2][9] = "8.22";
            Calculo[30][2][10] = "6.43";
            Calculo[30][2][11] = "8.01";
            Calculo[30][2][12] = "8.57";
            Calculo[30][2][13] = "3.18";
            Calculo[30][2][14] = "5.42";
            Calculo[30][2][15] = "8.42";
            Calculo[30][2][16] = "7.46";
 
            Calculo[31] = new Array(3);
            Calculo[31][0] = "Radiologia";
            Calculo[31][1] = "0";
            Calculo[31][2] = new Array(17);
            Calculo[31][2][0] = "6.94";
            Calculo[31][2][1] = "4.13";
            Calculo[31][2][2] = "5.57";
            Calculo[31][2][3] = "7.6";
            Calculo[31][2][4] = "7.9";
            Calculo[31][2][5] = "7.69";
            Calculo[31][2][6] = "7.6";
            Calculo[31][2][7] = "7.9";
            Calculo[31][2][8] = "6.11";
            Calculo[31][2][9] = "6.98";
            Calculo[31][2][10] = "5.79";
            Calculo[31][2][11] = "6.57";
            Calculo[31][2][12] = "8.54";
            Calculo[31][2][13] = "5.58";
            Calculo[31][2][14] = "4.62";
            Calculo[31][2][15] = "6.98";
            Calculo[31][2][16] = "6.75";
 
            Calculo[32] = new Array(3);
            Calculo[32][0] = "Reumatologia";
            Calculo[32][1] = "0";
            Calculo[32][2] = new Array(17);
            Calculo[32][2][0] = "7.89";
            Calculo[32][2][1] = "7.97";
            Calculo[32][2][2] = "9.17";
            Calculo[32][2][3] = "6.92";
            Calculo[32][2][4] = "6.9";
            Calculo[32][2][5] = "7.44";
            Calculo[32][2][6] = "3.6";
            Calculo[32][2][7] = "7.6";
            Calculo[32][2][8] = "6.75";
            Calculo[32][2][9] = "6.16";
            Calculo[32][2][10] = "4.19";
            Calculo[32][2][11] = "5.65";
            Calculo[32][2][12] = "8.57";
            Calculo[32][2][13] = "6.76";
            Calculo[32][2][14] = "5";
            Calculo[32][2][15] = "7.92";
            Calculo[32][2][16] = "5.37";
 
            Calculo[33] = new Array(3);
            Calculo[33][0] = "Cirurgia Toracica";
            Calculo[33][1] = "0";
            Calculo[33][2] = new Array(17);
            Calculo[33][2][0] = "7.67";
            Calculo[33][2][1] = "8.61";
            Calculo[33][2][2] = "4.92";
            Calculo[33][2][3] = "6.86";
            Calculo[33][2][4] = "3.47";
            Calculo[33][2][5] = "9.67";
            Calculo[33][2][6] = "7.65";
            Calculo[33][2][7] = "8.5";
            Calculo[33][2][8] = "5.16";
            Calculo[33][2][9] = "8.06";
            Calculo[33][2][10] = "9.71";
            Calculo[33][2][11] = "9.12";
            Calculo[33][2][12] = "8.88";
            Calculo[33][2][13] = "2";
            Calculo[33][2][14] = "5.08";
            Calculo[33][2][15] = "9.43";
            Calculo[33][2][16] = "8.8";
 
            Calculo[34] = new Array(3);
            Calculo[34][0] = "Urologia";
            Calculo[34][1] = "0";
            Calculo[34][2] = new Array(17);
            Calculo[34][2][0] = 8.09;
            Calculo[34][2][1] = 9;
            Calculo[34][2][2] = 8.38;
            Calculo[34][2][3] = 7.16;
            Calculo[34][2][4] = 6.14;
            Calculo[34][2][5] = 8.36;
            Calculo[34][2][6] = 6.79;
            Calculo[34][2][7] = 7.38;
            Calculo[34][2][8] = 5.8;
            Calculo[34][2][9] = 6.72;
            Calculo[34][2][10] = 8.52;
            Calculo[34][2][11] = 6.74;
            Calculo[34][2][12] = 9.4;
            Calculo[34][2][13] = 4.48;
            Calculo[34][2][14] = 5.35;
            Calculo[34][2][15] = 9;
            Calculo[34][2][16] = 7.3;
 
            Calculo[35] = new Array(3);
            Calculo[35][0] = "Medicina Adolescente";
            Calculo[35][1] = "0";
            Calculo[35][2] = new Array(17);
            Calculo[35][2][0] = 8.07;
            Calculo[35][2][1] = 7.31;
            Calculo[35][2][2] = 7.6;
            Calculo[35][2][3] = 7.72;
            Calculo[35][2][4] = 6.86;
            Calculo[35][2][5] = 6.29;
            Calculo[35][2][6] = 2.67;
            Calculo[35][2][7] = 7.32;
            Calculo[35][2][8] = 5.26;
            Calculo[35][2][9] = 7.24;
            Calculo[35][2][10] = 3.22;
            Calculo[35][2][11] = 6.1;
            Calculo[35][2][12] = 8.26;
            Calculo[35][2][13] = 6.05;
            Calculo[35][2][14] = 5.65;
            Calculo[35][2][15] = 8.11;
            Calculo[35][2][16] = 4.4;

            Calculo[36] = new Array(3);
            Calculo[36][0] = "Acupuntura";
            Calculo[36][1] = "0";
            Calculo[36][2] = new Array(17);
            Calculo[36][2][0] = 0;
            Calculo[36][2][1] = 0;
            Calculo[36][2][2] = 0;
            Calculo[36][2][3] = 0;
            Calculo[36][2][4] = 0;
            Calculo[36][2][5] = 0;
            Calculo[36][2][6] = 0;
            Calculo[36][2][7] = 0;
            Calculo[36][2][8] = 0;
            Calculo[36][2][9] = 0;
            Calculo[36][2][10] = 0;
            Calculo[36][2][11] = 0;
            Calculo[36][2][12] = 0;
            Calculo[36][2][13] = 0;
            Calculo[36][2][14] = 0;
            Calculo[36][2][15] = 0;
            Calculo[36][2][16] = 0;

            Calculo[37] = new Array(3);
            Calculo[37][0] = "Genética Médica";
            Calculo[37][1] = "0";
            Calculo[37][2] = new Array(17);
            Calculo[37][2][0] = 0;
            Calculo[37][2][1] = 0;
            Calculo[37][2][2] = 0;
            Calculo[37][2][3] = 0;
            Calculo[37][2][4] = 0;
            Calculo[37][2][5] = 0;
            Calculo[37][2][6] = 0;
            Calculo[37][2][7] = 0;
            Calculo[37][2][8] = 0;
            Calculo[37][2][9] = 0;
            Calculo[37][2][10] = 0;
            Calculo[37][2][11] = 0;
            Calculo[37][2][12] = 0;
            Calculo[37][2][13] = 0;
            Calculo[37][2][14] = 0;
            Calculo[37][2][15] = 0;
            Calculo[37][2][16] = 0;

            Calculo[38] = new Array(3);
            Calculo[38][0] = "Homeopatia";
            Calculo[38][1] = "0";
            Calculo[38][2] = new Array(17);
            Calculo[38][2][0] = 0;
            Calculo[38][2][1] = 0;
            Calculo[38][2][2] = 0;
            Calculo[38][2][3] = 0;
            Calculo[38][2][4] = 0;
            Calculo[38][2][5] = 0;
            Calculo[38][2][6] = 0;
            Calculo[38][2][7] = 0;
            Calculo[38][2][8] = 0;
            Calculo[38][2][9] = 0;
            Calculo[38][2][10] = 0;
            Calculo[38][2][11] = 0;
            Calculo[38][2][12] = 0;
            Calculo[38][2][13] = 0;
            Calculo[38][2][14] = 0;
            Calculo[38][2][15] = 0;
            Calculo[38][2][16] = 0;

            Calculo[39] = new Array(3);
            Calculo[39][0] = "Medicina do Trabalho";
            Calculo[39][1] = "0";
            Calculo[39][2] = new Array(17);
            Calculo[39][2][0] = 0;
            Calculo[39][2][1] = 0;
            Calculo[39][2][2] = 0;
            Calculo[39][2][3] = 0;
            Calculo[39][2][4] = 0;
            Calculo[39][2][5] = 0;
            Calculo[39][2][6] = 0;
            Calculo[39][2][7] = 0;
            Calculo[39][2][8] = 0;
            Calculo[39][2][9] = 0;
            Calculo[39][2][10] = 0;
            Calculo[39][2][11] = 0;
            Calculo[39][2][12] = 0;
            Calculo[39][2][13] = 0;
            Calculo[39][2][14] = 0;
            Calculo[39][2][15] = 0;
            Calculo[39][2][16] = 0;

            Calculo[40] = new Array(3);
            Calculo[40][0] = "Medicina do Tráfego";
            Calculo[40][1] = "0";
            Calculo[40][2] = new Array(17);
            Calculo[40][2][0] = 0;
            Calculo[40][2][1] = 0;
            Calculo[40][2][2] = 0;
            Calculo[40][2][3] = 0;
            Calculo[40][2][4] = 0;
            Calculo[40][2][5] = 0;
            Calculo[40][2][6] = 0;
            Calculo[40][2][7] = 0;
            Calculo[40][2][8] = 0;
            Calculo[40][2][9] = 0;
            Calculo[40][2][10] = 0;
            Calculo[40][2][11] = 0;
            Calculo[40][2][12] = 0;
            Calculo[40][2][13] = 0;
            Calculo[40][2][14] = 0;
            Calculo[40][2][15] = 0;
            Calculo[40][2][16] = 0;

            Calculo[41] = new Array(3);
            Calculo[41][0] = "Medicina Esportiva";
            Calculo[41][1] = "0";
            Calculo[41][2] = new Array(17);
            Calculo[41][2][0] = 0;
            Calculo[41][2][1] = 0;
            Calculo[41][2][2] = 0;
            Calculo[41][2][3] = 0;
            Calculo[41][2][4] = 0;
            Calculo[41][2][5] = 0;
            Calculo[41][2][6] = 0;
            Calculo[41][2][7] = 0;
            Calculo[41][2][8] = 0;
            Calculo[41][2][9] = 0;
            Calculo[41][2][10] = 0;
            Calculo[41][2][11] = 0;
            Calculo[41][2][12] = 0;
            Calculo[41][2][13] = 0;
            Calculo[41][2][14] = 0;
            Calculo[41][2][15] = 0;
            Calculo[41][2][16] = 0;

            Calculo[42] = new Array(3);
            Calculo[42][0] = "Medicina Legal";
            Calculo[42][1] = "0";
            Calculo[42][2] = new Array(17);
            Calculo[42][2][0] = 0;
            Calculo[42][2][1] = 0;
            Calculo[42][2][2] = 0;
            Calculo[42][2][3] = 0;
            Calculo[42][2][4] = 0;
            Calculo[42][2][5] = 0;
            Calculo[42][2][6] = 0;
            Calculo[42][2][7] = 0;
            Calculo[42][2][8] = 0;
            Calculo[42][2][9] = 0;
            Calculo[42][2][10] = 0;
            Calculo[42][2][11] = 0;
            Calculo[42][2][12] = 0;
            Calculo[42][2][13] = 0;
            Calculo[42][2][14] = 0;
            Calculo[42][2][15] = 0;
            Calculo[42][2][16] = 0;

            Calculo[43] = new Array(3);
            Calculo[43][0] = "Patologia Clínica/Medicina Laboratorial";
            Calculo[43][1] = "0";
            Calculo[43][2] = new Array(17);
            Calculo[43][2][0] = 0;
            Calculo[43][2][1] = 0;
            Calculo[43][2][2] = 0;
            Calculo[43][2][3] = 0;
            Calculo[43][2][4] = 0;
            Calculo[43][2][5] = 0;
            Calculo[43][2][6] = 0;
            Calculo[43][2][7] = 0;
            Calculo[43][2][8] = 0;
            Calculo[43][2][9] = 0;
            Calculo[43][2][10] = 0;
            Calculo[43][2][11] = 0;
            Calculo[43][2][12] = 0;
            Calculo[43][2][13] = 0;
            Calculo[43][2][14] = 0;
            Calculo[43][2][15] = 0;
            Calculo[43][2][16] = 0;

            Calculo[44] = new Array(3);
            Calculo[44][0] = "Radioterapia";
            Calculo[44][1] = "0";
            Calculo[44][2] = new Array(17);
            Calculo[44][2][0] = 0;
            Calculo[44][2][1] = 0;
            Calculo[44][2][2] = 0;
            Calculo[44][2][3] = 0;
            Calculo[44][2][4] = 0;
            Calculo[44][2][5] = 0;
            Calculo[44][2][6] = 0;
            Calculo[44][2][7] = 0;
            Calculo[44][2][8] = 0;
            Calculo[44][2][9] = 0;
            Calculo[44][2][10] = 0;
            Calculo[44][2][11] = 0;
            Calculo[44][2][12] = 0;
            Calculo[44][2][13] = 0;
            Calculo[44][2][14] = 0;
            Calculo[44][2][15] = 0;
            Calculo[44][2][16] = 0;

            Calculo[45] = new Array(3);
            Calculo[45][0] = "Angiologia";
            Calculo[45][1] = "0";
            Calculo[45][2] = new Array(17);
            Calculo[45][2][0] = 0;
            Calculo[45][2][1] = 0;
            Calculo[45][2][2] = 0;
            Calculo[45][2][3] = 0;
            Calculo[45][2][4] = 0;
            Calculo[45][2][5] = 0;
            Calculo[45][2][6] = 0;
            Calculo[45][2][7] = 0;
            Calculo[45][2][8] = 0;
            Calculo[45][2][9] = 0;
            Calculo[45][2][10] = 0;
            Calculo[45][2][11] = 0;
            Calculo[45][2][12] = 0;
            Calculo[45][2][13] = 0;
            Calculo[45][2][14] = 0;
            Calculo[45][2][15] = 0;
            Calculo[45][2][16] = 0;

            Calculo[46] = new Array(3);
            Calculo[46][0] = "Cirurgia Cardiovascular";
            Calculo[46][1] = "0";
            Calculo[46][2] = new Array(17);
            Calculo[46][2][0] = 0;
            Calculo[46][2][1] = 0;
            Calculo[46][2][2] = 0;
            Calculo[46][2][3] = 0;
            Calculo[46][2][4] = 0;
            Calculo[46][2][5] = 0;
            Calculo[46][2][6] = 0;
            Calculo[46][2][7] = 0;
            Calculo[46][2][8] = 0;
            Calculo[46][2][9] = 0;
            Calculo[46][2][10] = 0;
            Calculo[46][2][11] = 0;
            Calculo[46][2][12] = 0;
            Calculo[46][2][13] = 0;
            Calculo[46][2][14] = 0;
            Calculo[46][2][15] = 0;
            Calculo[46][2][16] = 0;

            Calculo[47] = new Array(3);
            Calculo[47][0] = "Cirurgia da Mão";
            Calculo[47][1] = "0";
            Calculo[47][2] = new Array(17);
            Calculo[47][2][0] = 0;
            Calculo[47][2][1] = 0;
            Calculo[47][2][2] = 0;
            Calculo[47][2][3] = 0;
            Calculo[47][2][4] = 0;
            Calculo[47][2][5] = 0;
            Calculo[47][2][6] = 0;
            Calculo[47][2][7] = 0;
            Calculo[47][2][8] = 0;
            Calculo[47][2][9] = 0;
            Calculo[47][2][10] = 0;
            Calculo[47][2][11] = 0;
            Calculo[47][2][12] = 0;
            Calculo[47][2][13] = 0;
            Calculo[47][2][14] = 0;
            Calculo[47][2][15] = 0;
            Calculo[47][2][16] = 0;

            Calculo[48] = new Array(3);
            Calculo[48][0] = "Cirurgia de Cabeça e Pescoço";
            Calculo[48][1] = "0";
            Calculo[48][2] = new Array(17);
            Calculo[48][2][0] = 0;
            Calculo[48][2][1] = 0;
            Calculo[48][2][2] = 0;
            Calculo[48][2][3] = 0;
            Calculo[48][2][4] = 0;
            Calculo[48][2][5] = 0;
            Calculo[48][2][6] = 0;
            Calculo[48][2][7] = 0;
            Calculo[48][2][8] = 0;
            Calculo[48][2][9] = 0;
            Calculo[48][2][10] = 0;
            Calculo[48][2][11] = 0;
            Calculo[48][2][12] = 0;
            Calculo[48][2][13] = 0;
            Calculo[48][2][14] = 0;
            Calculo[48][2][15] = 0;
            Calculo[48][2][16] = 0;

            Calculo[49] = new Array(3);
            Calculo[49][0] = "Cirurgia do Aparelho Digestivo";
            Calculo[49][1] = "0";
            Calculo[49][2] = new Array(17);
            Calculo[49][2][0] = 0;
            Calculo[49][2][1] = 0;
            Calculo[49][2][2] = 0;
            Calculo[49][2][3] = 0;
            Calculo[49][2][4] = 0;
            Calculo[49][2][5] = 0;
            Calculo[49][2][6] = 0;
            Calculo[49][2][7] = 0;
            Calculo[49][2][8] = 0;
            Calculo[49][2][9] = 0;
            Calculo[49][2][10] = 0;
            Calculo[49][2][11] = 0;
            Calculo[49][2][12] = 0;
            Calculo[49][2][13] = 0;
            Calculo[49][2][14] = 0;
            Calculo[49][2][15] = 0;
            Calculo[49][2][16] = 0;

            Calculo[50] = new Array(3);
            Calculo[50][0] = "Cirurgia Oncológica";
            Calculo[50][1] = "0";
            Calculo[50][2] = new Array(17);
            Calculo[50][2][0] = 0;
            Calculo[50][2][1] = 0;
            Calculo[50][2][2] = 0;
            Calculo[50][2][3] = 0;
            Calculo[50][2][4] = 0;
            Calculo[50][2][5] = 0;
            Calculo[50][2][6] = 0;
            Calculo[50][2][7] = 0;
            Calculo[50][2][8] = 0;
            Calculo[50][2][9] = 0;
            Calculo[50][2][10] = 0;
            Calculo[50][2][11] = 0;
            Calculo[50][2][12] = 0;
            Calculo[50][2][13] = 0;
            Calculo[50][2][14] = 0;
            Calculo[50][2][15] = 0;
            Calculo[50][2][16] = 0;

            Calculo[51] = new Array(3);
            Calculo[51][0] = "Cirurgia Pediátrica";
            Calculo[51][1] = "0";
            Calculo[51][2] = new Array(17);
            Calculo[51][2][0] = 0;
            Calculo[51][2][1] = 0;
            Calculo[51][2][2] = 0;
            Calculo[51][2][3] = 0;
            Calculo[51][2][4] = 0;
            Calculo[51][2][5] = 0;
            Calculo[51][2][6] = 0;
            Calculo[51][2][7] = 0;
            Calculo[51][2][8] = 0;
            Calculo[51][2][9] = 0;
            Calculo[51][2][10] = 0;
            Calculo[51][2][11] = 0;
            Calculo[51][2][12] = 0;
            Calculo[51][2][13] = 0;
            Calculo[51][2][14] = 0;
            Calculo[51][2][15] = 0;
            Calculo[51][2][16] = 0;

            Calculo[52] = new Array(3);
            Calculo[52][0] = "Cirurgia Vascular";
            Calculo[52][1] = "0";
            Calculo[52][2] = new Array(17);
            Calculo[52][2][0] = 0;
            Calculo[52][2][1] = 0;
            Calculo[52][2][2] = 0;
            Calculo[52][2][3] = 0;
            Calculo[52][2][4] = 0;
            Calculo[52][2][5] = 0;
            Calculo[52][2][6] = 0;
            Calculo[52][2][7] = 0;
            Calculo[52][2][8] = 0;
            Calculo[52][2][9] = 0;
            Calculo[52][2][10] = 0;
            Calculo[52][2][11] = 0;
            Calculo[52][2][12] = 0;
            Calculo[52][2][13] = 0;
            Calculo[52][2][14] = 0;
            Calculo[52][2][15] = 0;
            Calculo[52][2][16] = 0;

            Calculo[53] = new Array(3);
            Calculo[53][0] = "Endoscopia";
            Calculo[53][1] = "0";
            Calculo[53][2] = new Array(17);
            Calculo[53][2][0] = 0;
            Calculo[53][2][1] = 0;
            Calculo[53][2][2] = 0;
            Calculo[53][2][3] = 0;
            Calculo[53][2][4] = 0;
            Calculo[53][2][5] = 0;
            Calculo[53][2][6] = 0;
            Calculo[53][2][7] = 0;
            Calculo[53][2][8] = 0;
            Calculo[53][2][9] = 0;
            Calculo[53][2][10] = 0;
            Calculo[53][2][11] = 0;
            Calculo[53][2][12] = 0;
            Calculo[53][2][13] = 0;
            Calculo[53][2][14] = 0;
            Calculo[53][2][15] = 0;
            Calculo[53][2][16] = 0;

            Calculo[54] = new Array(3);
            Calculo[54][0] = "Mastologia";
            Calculo[54][1] = "0";
            Calculo[54][2] = new Array(17);
            Calculo[54][2][0] = 0;
            Calculo[54][2][1] = 0;
            Calculo[54][2][2] = 0;
            Calculo[54][2][3] = 0;
            Calculo[54][2][4] = 0;
            Calculo[54][2][5] = 0;
            Calculo[54][2][6] = 0;
            Calculo[54][2][7] = 0;
            Calculo[54][2][8] = 0;
            Calculo[54][2][9] = 0;
            Calculo[54][2][10] = 0;
            Calculo[54][2][11] = 0;
            Calculo[54][2][12] = 0;
            Calculo[54][2][13] = 0;
            Calculo[54][2][14] = 0;
            Calculo[54][2][15] = 0;
            Calculo[54][2][16] = 0;

            Calculo[55] = new Array(3);
            Calculo[55][0] = "Nutrologia";
            Calculo[55][1] = "0";
            Calculo[55][2] = new Array(17);
            Calculo[55][2][0] = 0;
            Calculo[55][2][1] = 0;
            Calculo[55][2][2] = 0;
            Calculo[55][2][3] = 0;
            Calculo[55][2][4] = 0;
            Calculo[55][2][5] = 0;
            Calculo[55][2][6] = 0;
            Calculo[55][2][7] = 0;
            Calculo[55][2][8] = 0;
            Calculo[55][2][9] = 0;
            Calculo[55][2][10] = 0;
            Calculo[55][2][11] = 0;
            Calculo[55][2][12] = 0;
            Calculo[55][2][13] = 0;
            Calculo[55][2][14] = 0;
            Calculo[55][2][15] = 0;
            Calculo[55][2][16] = 0;

            Calculo[56] = new Array(3);
            Calculo[56][0] = "Clínica Médica";
            Calculo[56][1] = "0";
            Calculo[56][2] = new Array(17);
            Calculo[56][2][0] = 0;
            Calculo[56][2][1] = 0;
            Calculo[56][2][2] = 0;
            Calculo[56][2][3] = 0;
            Calculo[56][2][4] = 0;
            Calculo[56][2][5] = 0;
            Calculo[56][2][6] = 0;
            Calculo[56][2][7] = 0;
            Calculo[56][2][8] = 0;
            Calculo[56][2][9] = 0;
            Calculo[56][2][10] = 0;
            Calculo[56][2][11] = 0;
            Calculo[56][2][12] = 0;
            Calculo[56][2][13] = 0;
            Calculo[56][2][14] = 0;
            Calculo[56][2][15] = 0;
            Calculo[56][2][16] = 0;
 
            var xi = 0;
            for (xi = 0; xi < Calculo.length; xi++) {
 
                Calculo[xi][1] = 0
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[0][1], 2) - round(Calculo[xi][2][0], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[1][1], 2) - round(Calculo[xi][2][1], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[2][1], 2) - round(Calculo[xi][2][2], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[3][1], 2) - round(Calculo[xi][2][3], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[4][1], 2) - round(Calculo[xi][2][4], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[5][1], 2) - round(Calculo[xi][2][5], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[6][1], 2) - round(Calculo[xi][2][6], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[7][1], 2) - round(Calculo[xi][2][7], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[8][1], 2) - round(Calculo[xi][2][8], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[9][1], 2) - round(Calculo[xi][2][9], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[10][1], 2) - round(Calculo[xi][2][10], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[11][1], 2) - round(Calculo[xi][2][11], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[12][1], 2) - round(Calculo[xi][2][12], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[13][1], 2) - round(Calculo[xi][2][13], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[14][1], 2) - round(Calculo[xi][2][14], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[15][1], 2) - round(Calculo[xi][2][15], 2));
                Calculo[xi][1] = Calculo[xi][1] + Math.abs(round(aResposta[16][1], 2) - round(Calculo[xi][2][16], 2));
 
 
                Calculo[xi][1] = 100 - round(Calculo[xi][1], 2);
 
            }
 
 
            var x = 0;
            var i2 = 0;
            var a1 = 0;
            var a2 = 0;
            var a3 = 0;
            for (x = 0; x < Calculo.length; x++) {
                for (i2 = 1; i2 < Calculo.length; i2++) {
 
                    if (round(Calculo[i2][1], 2) > round(Calculo[i2 - 1][1], 2)) {
 
                        a1 = Calculo[i2][0];
                        a2 = Calculo[i2][1];
                        a3 = Calculo[i2][2];
                        Calculo[i2][0] = Calculo[i2 - 1][0];
                        Calculo[i2][1] = Calculo[i2 - 1][1];
                        Calculo[i2][2] = Calculo[i2 - 1][2];
                        Calculo[i2 - 1][0] = a1;
                        Calculo[i2 - 1][1] = a2;
                        Calculo[i2 - 1][2] = a3;
 
                    }
 
                }
            }
 
 
 
            var str = "<Table aLIGN='CENTER'>";
            str = str + "<tr><td><font face='Verdana, Arial, Helvetica, sans-serif' size='2' color='#003366'><B>Especialidade</td>";
            str = str + "<TD>&nbsp;</TD>";
            str = str + "<td><font face='Verdana, Arial, Helvetica, sans-serif' size='2' color='#003366'><B>Probabilidade de acerto</td></tr>";
 
            var x3 = 0;
            for (x3 = 0; x3 < Calculo.length; x3++) {
                str = str + "<tr><td><font face='Verdana, Arial, Helvetica, sans-serif' size='2' color='#003366'>" + Calculo[x3][0] + "</td>";
                str = str + "<TD>&nbsp;</TD>";
                str = str + "<td Align='center'><font face='Verdana, Arial, Helvetica, sans-serif' size='2' color='#003366'>" + round(Calculo[x3][1], 2) + "%</td></tr>";
            }
            str = str + "</Table>";
 
            changeDivContent('page3c', str);
 
        }
 
        function page2() {
            document.getElementById('page3').style.display = 'none';
            document.getElementById('page2').style.display = 'block';
            document.getElementById('page1').style.display = 'none';
            document.getElementById('main').style.display = 'none';
            scroll(0, 0);
 
            aResposta[0] = new Array(3);
            aResposta[0][0] = "autonomia";
            aResposta[0][1] = document.getElementById('iQ1').value;
            aResposta[0][2] = "1";
 
            aResposta[1] = new Array(3);
            aResposta[1][0] = "tempo de contato direto com o paciente";
            aResposta[1][1] = document.getElementById('iQ2').value;
            aResposta[1][2] = "2";
 
            aResposta[2] = new Array(3);
            aResposta[2][0] = "depend&#234;ncia do paciente";
            aResposta[2][1] = document.getElementById('iQ3').value;
            aResposta[2][2] = "3";
 
            aResposta[3] = new Array(3);
            aResposta[3][0] = "diversidade de patologias";
            aResposta[3][1] = document.getElementById('iQ4').value;
            aResposta[3][2] = "4";
 
            aResposta[4] = new Array(3);
            aResposta[4][0] = "tempo livre";
            aResposta[4][1] = document.getElementById('iQ5').value;
            aResposta[4][2] = "5";
 
            aResposta[5] = new Array(3);
            aResposta[5][0] = "conhecimentos t&#233;cnicos";
            aResposta[5][1] = document.getElementById('iQ6').value;
            aResposta[5][2] = "6";
 
            aResposta[6] = new Array(3);
            aResposta[6][0] = "ganhos financeiros";
            aResposta[6][1] = document.getElementById('iQ7').value;
            aResposta[6][2] = "7";
 
            aResposta[7] = new Array(3);
            aResposta[7][0] = "criatividade";
            aResposta[7][1] = document.getElementById('iQ8').value;
            aResposta[7][2] = "8";
 
            aResposta[8] = new Array(3);
            aResposta[8][0] = "raciocinio l&#243;gico";
            aResposta[8][1] = document.getElementById('iQ9').value;
            aResposta[8][2] = "9";
 
            aResposta[9] = new Array(3);
            aResposta[9][0] = "relacionamento com outros colegas";
            aResposta[9][1] = document.getElementById('iQ10').value;
            aResposta[9][2] = "10";
 
            aResposta[10] = new Array(3);
            aResposta[10][0] = "habilidade manual";
            aResposta[10][1] = document.getElementById('iQ11').value;
            aResposta[10][2] = "11";
 
            aResposta[11] = new Array(3);
            aResposta[11][0] = "estresse";
            aResposta[11][1] = document.getElementById('iQ12').value;
            aResposta[11][2] = "12";
 
            aResposta[12] = new Array(3);
            aResposta[12][0] = "responsabilidade";
            aResposta[12][1] = document.getElementById('iQ13').value;
            aResposta[12][2] = "13";
 
            aResposta[13] = new Array(3);
            aResposta[13][0] = "regularidade de hor&#225;rios";
            aResposta[13][1] = document.getElementById('iQ14').value;
            aResposta[13][2] = "14";
 
            aResposta[14] = new Array(3);
            aResposta[14][0] = "seguran&#231;a profissional";
            aResposta[14][1] = document.getElementById('iQ15').value;
            aResposta[14][2] = "15";
 
            aResposta[15] = new Array(3);
            aResposta[15][0] = "resultados";
            aResposta[15][1] = document.getElementById('iQ16').value;
            aResposta[15][2] = "16";
 
            aResposta[16] = new Array(3);
            aResposta[16][0] = "status";
            aResposta[16][1] = document.getElementById('iQ17').value;
            aResposta[16][2] = "17";
 
            var i1 = 0;
            for (i1 = 0; i1 < aResposta.length; i1++) {
 
                if (!IsNumeric(aResposta[i1][1])) {
                    aResposta[i1][1] = "0";
                }
                else if (aResposta[i1][1] == "") { //.trim()
                    aResposta[i1][1] = "0";
                }
                else {
                    if (round(aResposta[i1][1], 2) > 10) {
                        aResposta[i1][1] = "10";
                    }
                    else {
                        aResposta[i1][1] = round(aResposta[i1][1], 2);
                    }
                }
 
 
            }
 
            var str = "<table>";
 
            var i3 = 0;
            for (i3 = 0; i3 < aResposta.length; i3++) {
                str = str + "<TR><TD><font face='Verdana, Arial, Helvetica, sans-serif' size='2' color='#003366'>";
                str = str + aResposta[i3][0];
 
                if (i3 < aResposta.length - 1)
                    str = str + "</TD><TD><INPUT TYPE='text' size='5' maxlength='5' id='iQQ" + aResposta[i3][2] + "' Value='" + aResposta[i3][1] + "'  onkeypress='return handle_keypress(event,\"iQQ" + aResposta[i3 + 1][2] + "\"); '></TD></TR>";
                else
                    str = str + "</TD><TD><INPUT TYPE='text' size='5' maxlength='5' id='iQQ" + aResposta[i3][2] + "' Value='" + aResposta[i3][1] + "'  onkeypress='return handle_keypress(event,\"prosseguir_p2\"); '></TD></TR>";
            }
            str = str + "</table>";
 
            changeDivContent('page2c', str);
            document.getElementById('iQQ' + aResposta[0][2]).focus();
 
        }
 
        function ordenar() {
 
            aResposta[0] = new Array(3);
            aResposta[0][0] = "autonomia";
            aResposta[0][1] = document.getElementById("iQQ1").value;
            aResposta[0][2] = "1";
 
            aResposta[1] = new Array(3);
            aResposta[1][0] = "tempo de contato direto com o paciente";
            aResposta[1][1] = document.getElementById("iQQ2").value;
            aResposta[1][2] = "2";
 
            aResposta[2] = new Array(3);
            aResposta[2][0] = "depend&#234;ncia do paciente";
            aResposta[2][1] = document.getElementById("iQQ3").value;
            aResposta[2][2] = "3";
 
            aResposta[3] = new Array(3);
            aResposta[3][0] = "diversidade de patologias";
            aResposta[3][1] = document.getElementById("iQQ4").value;
            aResposta[3][2] = "4";
 
            aResposta[4] = new Array(3);
            aResposta[4][0] = "tempo livre";
            aResposta[4][1] = document.getElementById("iQQ5").value;
            aResposta[4][2] = "5";
 
            aResposta[5] = new Array(3);
            aResposta[5][0] = "conhecimentos t&#233;cnicos";
            aResposta[5][1] = document.getElementById("iQQ6").value;
            aResposta[5][2] = "6";
 
            aResposta[6] = new Array(3);
            aResposta[6][0] = "ganhos financeiros";
            aResposta[6][1] = document.getElementById("iQQ7").value;
            aResposta[6][2] = "7";
 
            aResposta[7] = new Array(3);
            aResposta[7][0] = "criatividade";
            aResposta[7][1] = document.getElementById("iQQ8").value;
            aResposta[7][2] = "8";
 
            aResposta[8] = new Array(3);
            aResposta[8][0] = "raciocinio l&#243;gico";
            aResposta[8][1] = document.getElementById("iQQ9").value;
            aResposta[8][2] = "9";
 
            aResposta[9] = new Array(3);
            aResposta[9][0] = "relacionamento com outros colegas";
            aResposta[9][1] = document.getElementById("iQQ10").value;
            aResposta[9][2] = "10";
 
            aResposta[10] = new Array(3);
            aResposta[10][0] = "habilidade manual";
            aResposta[10][1] = document.getElementById("iQQ11").value;
            aResposta[10][2] = "11";
 
            aResposta[11] = new Array(3);
            aResposta[11][0] = "estresse";
            aResposta[11][1] = document.getElementById("iQQ12").value;
            aResposta[11][2] = "12";
 
            aResposta[12] = new Array(3);
            aResposta[12][0] = "responsabilidade";
            aResposta[12][1] = document.getElementById("iQQ13").value;
            aResposta[12][2] = "13";
 
            aResposta[13] = new Array(3);
            aResposta[13][0] = "regularidade de hor&#225;rios";
            aResposta[13][1] = document.getElementById("iQQ14").value;
            aResposta[13][2] = "14";
 
            aResposta[14] = new Array(3);
            aResposta[14][0] = "seguran&#231;a profissional";
            aResposta[14][1] = document.getElementById("iQQ15").value;
            aResposta[14][2] = "15";
 
            aResposta[15] = new Array(3);
            aResposta[15][0] = "resultados";
            aResposta[15][1] = document.getElementById("iQQ16").value;
            aResposta[15][2] = "16";
 
            aResposta[16] = new Array(3);
            aResposta[16][0] = "status";
            aResposta[16][1] = document.getElementById("iQQ17").value;
            aResposta[16][2] = "17";
 
            var x = 0;
            var i2 = 1;
 
            var a1 = "";
            var a2 = "";
            var a3 = "";
 
            for (x = 0; x < aResposta.length; x++) {
                for (i2 = 1; i2 < aResposta.length; i2++) {
 
                    if (round(aResposta[i2][1], 2) > round(aResposta[i2 - 1][1], 2)) {
 
                        a1 = aResposta[i2][0];
                        a2 = aResposta[i2][1];
                        a3 = aResposta[i2][2];
                        aResposta[i2][0] = aResposta[i2 - 1][0];
                        aResposta[i2][1] = aResposta[i2 - 1][1];
                        aResposta[i2][2] = aResposta[i2 - 1][2];
                        aResposta[i2 - 1][0] = a1;
                        aResposta[i2 - 1][1] = a2;
                        aResposta[i2 - 1][2] = a3;
 
                    }
 
                }
            }
 
            var str = "<table>";
 
            var i3 = 0;
            for (i3 = 0; i3 < aResposta.length; i3++) {
                str = str + "<TR><TD><font face='Verdana, Arial, Helvetica, sans-serif' size='2' color='#003366'>";
                str = str + aResposta[i3][0];
 
 
                if (i3 < aResposta.length - 1)
                    str = str + "</TD><TD><INPUT TYPE='text' size='5' maxlength='5' id='iQQ" + aResposta[i3][2] + "' Value='" + aResposta[i3][1] + "'  onkeypress='return handle_keypress(event,\"iQQ" + aResposta[i3 + 1][2] + "\"); '></TD></TR>";
                else
                    str = str + "</TD><TD><INPUT TYPE='text' size='5' maxlength='5' id='iQQ" + aResposta[i3][2] + "' Value='" + aResposta[i3][1] + "'  onkeypress='return handle_keypress(event,\"prosseguir_p2\"); '></TD></TR>";
 
            }
 
            str = str + "</table>";
            //str = "";
            changeDivContent('page2c', str);
        }
 
        function page1() {
            document.getElementById('page3').style.display = 'none';
            document.getElementById('page2').style.display = 'none';
            document.getElementById('page1').style.display = 'block';
            document.getElementById('main').style.display = 'none';
            scroll(0, 0);
 
            document.getElementById('iQ1').focus();
        }
 
        function load() {
            document.getElementById('page3').style.display = 'none';
            document.getElementById('page2').style.display = 'none';
            document.getElementById('page1').style.display = 'none';
            document.getElementById('main').style.display = 'block';
            scroll(0, 0);
        }