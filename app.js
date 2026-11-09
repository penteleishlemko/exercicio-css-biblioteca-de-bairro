const botaoVoltarTopo = document.getElementById("voltar-topo");

        function atualizarBotaoVoltarTopo() {
            botaoVoltarTopo.hidden = window.scrollY < 300;
        }

        window.addEventListener("scroll", atualizarBotaoVoltarTopo);
        atualizarBotaoVoltarTopo();

        botaoVoltarTopo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });