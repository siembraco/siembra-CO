setTimeout(() => {
    document.getElementById('weglot-language-fr').addEventListener("click", idsChange)
    document.getElementById('weglot-language-en').addEventListener("click", idsChange)
    document.getElementById('weglot-language-pt').addEventListener("click", idsChange)
    document.getElementById('weglot-language-es').addEventListener("click", idsChange)
    document.getElementById('weglot-language-ar').addEventListener("click", idsChange)

    function idsChange() {
        setTimeout(() => {
            if ( window.location.href == 'https://co.siembraco.com/cart' ) {
                document.getElementById("edit-submit").value = 'Añadir siembra'
                document.getElementById("edit-checkout").value = 'Iniciar Siembra'
                let btnsDelete = document.querySelectorAll('.delete-order-item');

                if (btnsDelete) {
                        btnsDelete.forEach(item => {
                                item.value ='Eliminar';
                        });
                }
            } else {
               let btnSubmit =  document.getElementById("edit-submit");
                let btnSubmit2 = document.getElementById("edit-actions-next");
        if (btnSubmit) {
                        btnSubmit.value = 'Añadir siembra';
                }

                if (btnSubmit2) {
                        btnSubmit2.value = 'Continua tu Siembra'
                }
            }
            console.log('weffew');
        }, 2000);
    }

        idsChange();
}, 3000);
