<script>
    import RetoForm from './RetoForm.svelte'
    
    let modal = false;
    function showModal(){
        modal = (modal===true) ? false : true;
    }
</script>

<div class="h-screen relative flex justify-center items-center flex-col px-4 md:px-0">
    <div>
        <img class=" absolute left-2/4 top-2/4 w-full h-full object-cover -z-10 -translate-x-2/4 -translate-y-2/4 mix-blend-hard-light opacity-75" src="hero-bg.jpg" alt="bg" />
        <img class=" absolute left-2/4 top-2/4 w-full h-full object-cover -z-20 -translate-x-2/4 -translate-y-2/4" src="bg-image.jpg" alt="bg" />
        <img src="reto-logo.png" class="z-10 logo-big w-full " alt="logo">
    </div>
    <div class="my-16 text-center">
        <h4 class=" text-center text-4xl text-white font-montserrat italic font-black">Rioverde - SLP - 10 de Septiembre de 2022</h4>
    </div>
    <div class="flex flex-col md:flex-row my-8  md:my-16 ">
        <div class="text-center md:mr-4 md:mb-8 mb-0">
            <a class=" transition-all hover:bg-fuga-pink hover:text-white rounded-md py-2 px-8 text-xl md:text-2xl uppercase font-black font-montserrat italic bg-white " href="https://chronosport.mx/carrera/22646/funcion/96907" target="_blank">
                Inscríbete aquí
            </a>
        </div>
        <div class="text-center md:mt-0 mt-8 md:ml-4 opacity-75 hover:opacity-100 transition-all">
            <label for="my-modal"  on:click={showModal} class=" cursor-pointer transition-all hover:bg-fuga-pink hover:text-white   rounded-md py-2 px-8 text-xl md:text-2xl uppercase font-black font-montserrat italic bg-white">
                Reta a alguien más
            </label>
        </div>
    </div>
</div>

{#if (modal)}
<input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            <h2 class="text-xl md:text-2xl uppercase font-black font-montserrat italic mb-4">Reta a alguien más</h2>
            <RetoForm />
            <label class="absolute top-6 right-6 font-montserrat italic font-black text-fuga-pink cursor-pointer  " on:click={showModal} for="my-modal">X</label>
        </div>
    </div>
{/if}

<style>
    .logo-big {
        max-width: 600px;
    }
</style>