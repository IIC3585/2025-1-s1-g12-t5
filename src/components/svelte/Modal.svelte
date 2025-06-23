<script>
  let { showModal = $bindable(), header, children, footer } = $props();
  let dialog = $state();

  $effect(() => {
    if (showModal) dialog.showModal();
  });
</script>

<dialog
  bind:this={dialog}
  onclose={() => (showModal = false)}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  <div>
    <button
      onclick={() => dialog.close()}
      class="close-btn"
      aria-label="Cerrar modal"
    >
      ×
    </button>

    {#if header}
      {@render header()}
      <hr />
    {/if}

    {@render children()}

    {#if footer}
      <hr />
      {@render footer()}
    {/if}
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.5em;
    border: none;
    padding: 0;
    margin: auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  dialog > div {
    padding: 1.5em;
    text-align: left;
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    padding: 0.2em 0.5em;
    color: #666;
    transition: color 0.2s ease;
  }

  .close-btn:hover {
    color: #000;
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
