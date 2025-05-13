<script>
    export let checked = true;
</script>

<label class="switch">
    <input type="checkbox" bind:checked={checked}>
    <span class="slider round"></span>
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 3em;
        height: 1.6em;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #929292;
        -webkit-transition: .1s;
        transition: .1s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 1.3em;
        width: 1.3em;
        left: 0.16em;
        bottom: 0.16em;
        background-color: white;
        -webkit-transition: .1s;
        transition: .1s;
    }

    input:checked + .slider {
        background-color: var(--accent-green);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--accent-green);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(1.4em);
        -ms-transform: translateX(1.4em);
        transform: translateX(1.4em);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>