<script>
    let sent=false;
    function submitForm(e) {
        const formData = new FormData(e.target);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        //console.log(data)
        fetch("/api/sendmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(()=>{sent = true});
    }

    let challengerName;
    let challengedEmail;
    let challengedName;
    let phoneNumber;
</script>

{#if sent}

    <div class="text-center">
        Gracias por participar, su invitación fue enviada por correo.
    </div>

{:else}
    <form on:submit|preventDefault="{submitForm}">
        <div class="">
            <div class="flex-auto mb-4">
                <input type="text" placeholder="Tu nombre" name="challengerName" bind:value={challengerName}  class="input input-bordered w-full max-w-xs" >
            </div>
            <div class="flex-auto mb-4">
                <input type="text" placeholder="¿A quién retas?" name="challengedName" bind:value={challengedName}  class="input input-bordered w-full max-w-xs" >
            </div>
            <div class="flex-auto mb-4">
                <input type="email" placeholder="Su dirección de correo" name="challengedEmail" bind:value={challengedEmail}  class="input input-bordered w-full max-w-xs">
                <p class="my-2 ml-4"><strong>ó</strong></p> 
                <input type="number" placeholder="Su número de teléfono. Ej:4444123456" name="phoneNumber" class="input input-bordered w-full max-w-xs" bind:value={phoneNumber}>
                <br>
                <small>(Llena solo el campo de contacto que quieras usar)</small>
            </div>
        </div>
        {#if (challengedEmail) && !(phoneNumber)}
        <div>
            <div class="flex-auto text-center" >
                <input type="submit" value="Retar por correo" class="btn text-base md:text-xl bg-fuga-pink uppercase font-black font-montserrat italic">
            </div>
        </div>
        {/if}
    </form>

    {#if (phoneNumber) && !(challengedEmail)}
        <div class="text-center">
            <a class="text-base md:text-xl bg-fuga-pink uppercase font-black font-montserrat italic btn" target="_blank" href="https://wa.me/52{phoneNumber}/?text=Hola {challengedName}, checa esta competencia, es el 10 de Septiempre en Ríoverde, puedes saber más e inscribirte en https://retofuga.com/">Retar vía WhatsApp</a>
        </div>
    {/if}

    {#if (phoneNumber) && (challengedEmail)}
        Debe llenar un solo campo de contacto
    {/if}

{/if}